const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/payment.controller");

const router = express.Router();

// Return Razorpay Key to Frontend
router.get("/get-key", (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID
  });
});

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router;
