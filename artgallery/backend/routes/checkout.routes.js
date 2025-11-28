const express = require("express");
const { createCheckout } = require("../controllers/checkout.controller.js").default;

const router = express.Router();

router.post("/create", createCheckout);

module.exports = router;
