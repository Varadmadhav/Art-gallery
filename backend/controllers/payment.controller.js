const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Payment = require("../models/payment.model");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// -------------------------------------------------------
// 1️⃣ INITIATE PAYMENT
// -------------------------------------------------------
exports.initiatePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }

    // Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: order.orderId,
    });

    // Create Payment Entry
    const payment = await Payment.create({
      order: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: order.totalAmount,
      currency: "INR",
      status: "PENDING", // allowed in schema now
    });

    // Link payment in Order
    order.payment = payment._id;
    await order.save();

    res.json({
      success: true,
      razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.totalAmount,
      currency: "INR",
      orderId: order.orderId,
    });
  } catch (err) {
    console.error("Payment initiation error:", err);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};


// -------------------------------------------------------
// 2️⃣ VERIFY PAYMENT
// -------------------------------------------------------
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const payload = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(payload)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    // Fetch payment record
    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
    }).populate("order");

    if (!payment)
      return res.status(404).json({ success: false, message: "Payment not found" });

    // ------------------------------------
    // SUCCESS
    // ------------------------------------
    if (isValid) {
      payment.razorpayPaymentId = razorpay_payment_id;
      payment.razorpaySignature = razorpay_signature;
      payment.status = "SUCCESS";

      // Fetch method details
      const rpPayment = await razorpay.payments.fetch(razorpay_payment_id);
      payment.method = rpPayment.method;
      payment.bank = rpPayment.bank || null;
      payment.wallet = rpPayment.wallet || null;
      payment.card_id = rpPayment.card_id || null;
      payment.vpa = rpPayment.vpa || null;
      payment.email = rpPayment.email || null;
      payment.contact = rpPayment.contact || null;

      await payment.save();

      // Update order
      payment.order.paymentStatus = "PAID";
      payment.order.orderStatus = "CONFIRMED";
      await payment.order.save();

      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    }

    // ------------------------------------
    // FAILURE
    // ------------------------------------
    payment.status = "FAILED";
    await payment.save();

    payment.order.paymentStatus = "FAILED";
    payment.order.orderStatus = "CANCELLED";
    await payment.order.save();

    return res.json({
      success: false,
      message: "Payment verification failed",
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ message: "Verification failed" });
  }
};
