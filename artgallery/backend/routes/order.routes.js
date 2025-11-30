const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

router.post("/create", createOrder);
router.get("/:orderId", getOrder);
router.get("/user/:userId", getUserOrders);
router.put("/status/:orderId", updateOrderStatus);

module.exports = router;
