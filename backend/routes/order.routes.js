const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus,
  downloadInvoice,
  getAllOrdersAdmin,   // ⬅ added
} = require("../controllers/order.controller");

// ------------------------------------------------------
// ADMIN: Get all orders
// ------------------------------------------------------
router.get("/admin/all", getAllOrdersAdmin);

// ------------------------------------------------------
// Create an order
// ------------------------------------------------------
router.post("/create", createOrder);

// ------------------------------------------------------
// Get all orders of a user
// ------------------------------------------------------
router.get("/user/:userId", getUserOrders);

// ------------------------------------------------------
// Get single order
// (must be after "user" & "admin" so routes don't clash)
// ------------------------------------------------------
router.get("/:orderId", getOrder);

// ------------------------------------------------------
// Update order status (admin/system)
// ------------------------------------------------------
router.put("/status/:orderId", updateOrderStatus);

// ------------------------------------------------------
// Download Invoice PDF
// ------------------------------------------------------
router.get("/:orderId/invoice", downloadInvoice);

module.exports = router;
