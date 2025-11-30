const express = require("express");
const router = express.Router();
const {
  initiatePayment,
  verifyPayment,
} = require("../controllers/payment.controller");

// Create Razorpay Order
router.post("/initiate", initiatePayment);

// Verify Razorpay Payment
router.post("/verify", verifyPayment);

module.exports = router;
