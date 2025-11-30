const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    artwork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
    title: {
      type: String, // store title at the time of purchase
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    price: {
      type: Number, // price per item at time of order
      required: true,
    },
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: "India" },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    // Human-readable order id like Amazon: ORD_1732738273
    orderId: {
      type: String,
      unique: true,
      required: true,
    },

    // Who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // All items in the order (like Amazon order items table)
    items: {
      type: [orderItemSchema],
      required: true,
      validate: v => Array.isArray(v) && v.length > 0,
    },

    // Copy of shipping address at the time of order
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    // Payment info
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    // Order lifecycle status – Amazon-style
    orderStatus: {
      type: String,
      enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"],
      default: "PLACED",
    },

    paymentMethod: {
      type: String, // "RAZORPAY", "COD", "CARD", etc.
      default: "RAZORPAY",
    },

    // Monetary fields
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Optional – link to Payment document (we’ll create this model next)
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Order", orderSchema);
