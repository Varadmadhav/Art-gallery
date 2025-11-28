const Checkout = require("../models/Checkout");

const createCheckout = async (req, res) => {
  try {
    const data = req.body;
    const saved = await Checkout.create(data);

    return res.json({
      success: true,
      message: "Checkout saved",
      order: saved
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error saving checkout"
    });
  }
};

module.exports = { createCheckout };
