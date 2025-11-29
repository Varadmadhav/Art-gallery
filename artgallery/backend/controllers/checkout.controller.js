const Checkout = require("../models/Checkout");

/* ------------------------------------------
   ✅ CREATE CHECKOUT (PLACE ORDER)
------------------------------------------- */
exports.createCheckout = async (req, res) => {
  try {
    const data = req.body;
    const saved = await Checkout.create(data);

    res.json({
      success: true,
      message: "Checkout saved",
      order: saved,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving checkout",
    });
  }
};

/* ------------------------------------------
   ✅ GET ALL ORDERS
------------------------------------------- */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Checkout.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};

/* ------------------------------------------
   ✅ UPDATE ORDER STATUS (NEWLY ADDED)
------------------------------------------- */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;  // Order ID
    const { status } = req.body; // New status

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const updatedOrder = await Checkout.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating order",
    });
  }
};
