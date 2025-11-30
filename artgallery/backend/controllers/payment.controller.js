const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Payment = require("../models/payment.model");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------------------------------------------------------
// 1️⃣ INITIATE PAYMENT (Create Razorpay Order)
// ---------------------------------------------------------
exports.initiatePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: order.orderId,
    });

    // Create Payment entry
    const payment = await Payment.create({
      order: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: order.totalAmount,
      currency: "INR",
      status: "PENDING",
    });

    // Attach payment ID to order
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

// ---------------------------------------------------------
// 2️⃣ VERIFY PAYMENT (After User Completes Payment)
// ---------------------------------------------------------
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Validate signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    // Find payment record
    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
    }).populate("order");

    if (!payment)
      return res.status(404).json({ message: "Payment not found" });

    const order = payment.order;

    // If signature matched → fetch full payment details
    if (isAuthentic) {
      // 3️⃣ Fetch full Razorpay payment object
      const paymentDetails = await razorpay.payments.fetch(
        razorpay_payment_id
      );

      // 4️⃣ Update payment entry with all extra info
      payment.razorpayPaymentId = razorpay_payment_id;
      payment.razorpaySignature = razorpay_signature;

      payment.method = paymentDetails.method; // upi / card / netbanking / wallet
      payment.bank = paymentDetails.bank || null;
      payment.wallet = paymentDetails.wallet || null;
      payment.card_id = paymentDetails.card_id || null;
      payment.vpa = paymentDetails.vpa || null;
      payment.email = paymentDetails.email || null;
      payment.contact = paymentDetails.contact || null;

      payment.status = "SUCCESS";
      await payment.save();

      // 5️⃣ Update order
      order.paymentStatus = "PAID";
      order.orderStatus = "CONFIRMED";
      await order.save();

      return res.json({
        success: true,
        message: "Payment verified successfully",
        payment,
      });
    }

    // ❌ Signature mismatch → FAILED
    payment.status = "FAILED";
    await payment.save();

    order.paymentStatus = "FAILED";
    order.orderStatus = "CANCELLED";
    await order.save();

    return res.json({
      success: false,
      message: "Payment verification failed",
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ message: "Server error during verification" });
  }
};
