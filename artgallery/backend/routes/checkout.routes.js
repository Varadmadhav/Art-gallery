const express = require("express");
const { 
  createCheckout, 
  getAllOrders,
  updateOrderStatus // ⬅️ NEW IMPORT
} = require("../controllers/checkout.controller.js");

const router = express.Router();

// Create order (checkout)
router.post("/create", createCheckout);

// Get all orders
router.get("/", getAllOrders);

// ✅ Update order status
router.put("/:id/status", updateOrderStatus);

module.exports = router;
