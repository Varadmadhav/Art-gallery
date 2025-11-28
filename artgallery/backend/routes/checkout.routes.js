const express = require("express");
const { createCheckout, getAllOrders } = require("../controllers/checkout.controller.js");

const router = express.Router();

router.post("/create", createCheckout);
router.get("/", getAllOrders);

module.exports = router;
