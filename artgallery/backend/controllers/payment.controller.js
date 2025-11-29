const crypto = require("crypto");
const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_1"
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expected === razorpay_signature) {
      return res.json({ status: "success" });
    } else {
      return res.status(400).json({ status: "failed" });
    }
  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
};
