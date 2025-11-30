const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    });

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ status: "failed" });
    }

    const items = orderData.cart.map(item => ({
      artwork: item.artworkId,
      quantity: item.quantity,
      price: item.price
    }));

    const newOrder = await Order.create({
      user: orderData.userId || null,
      items,
      totalAmount: orderData.total,
      status: "processing"
    });

    return res.json({ status: "success", orderId: newOrder._id });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Verification failed" });
  }
};
