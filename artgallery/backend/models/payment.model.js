const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    // Link to internal Order
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    // Razorpay Order ID
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },

    // Razorpay Payment ID (filled after success)
    razorpayPaymentId: {
      type: String,
      default: null,
    },

    // Razorpay Signature
    razorpaySignature: {
      type: String,
      default: null,
    },

    // Amount snapshot
    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    // -------------------------
    // EXTRA FIELDS (NEW)
    // -------------------------

    method: {
      type: String, // upi / card / netbanking / wallet
      default: null,
    },

    bank: {
      type: String, // Bank name for netbanking
      default: null,
    },

    wallet: {
      type: String, // Wallet name for wallet payment
      default: null,
    },

    card_id: {
      type: String, // Razorpay card ID
      default: null,
    },

    vpa: {
      type: String, // UPI handle
      default: null,
    },

    email: {
      type: String, // Razorpay supplied email
      default: null,
    },

    contact: {
      type: String, // Razorpay supplied phone
      default: null,
    },

    // Payment lifecycle
    status: {
      type: String,
      enum: ["CREATED", "SUCCESS", "FAILED"],
      default: "CREATED",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
