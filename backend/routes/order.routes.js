const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus,
  downloadInvoice,
} = require("../controllers/order.controller");

// Create an order
router.post("/create", createOrder);

// Get single order
router.get("/:orderId", getOrder);

// Get all orders of a user
router.get("/user/:userId", getUserOrders);

// Update order status (admin/system)
router.put("/status/:orderId", updateOrderStatus);

// Download Invoice PDF
router.get("/:orderId/invoice", downloadInvoice);

module.exports = router;
