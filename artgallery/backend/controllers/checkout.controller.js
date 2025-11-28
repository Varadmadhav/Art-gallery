const Checkout = require("../models/Checkout");

exports.createCheckout = async (req, res) => {
  try {
    const data = req.body;
    const saved = await Checkout.create(data);

    res.json({
      success: true,
      message: "Checkout saved",
      order: saved
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving checkout"
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Checkout.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders"
    });
  }
};
