const express = require("express")
const {
  getAllOrders,
  getAdminStats,
  getRecentOrders,
  getCustomersFromOrders
} = require("../controllers/order.controller")
const { protect } = require("../middlewares/auth.middleware")
const { admin } = require("../middlewares/admin.middleware")

const router = express.Router()

// Admin-only routes
router.get("/", protect, admin, getAllOrders)
router.get("/admin/stats", protect, admin, getAdminStats)
router.get("/admin/recent", protect, admin, getRecentOrders)
router.get("/admin/customers", protect, admin, getCustomersFromOrders)

module.exports = router
