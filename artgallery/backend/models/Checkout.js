const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String,

  paymentMethod: String,

  cart: [
    {
      artworkId: String,
      title: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],

  subtotal: Number,
  shipping: Number,
  total: Number,

  // IMPORTANT: lowercase status values for consistency
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Checkout", CheckoutSchema);
