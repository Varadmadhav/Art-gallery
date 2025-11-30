const Order = require("../models/Order");
const Payment = require("../models/payment.model");
const generateInvoice = require("../utils/invoiceGenerator");

// Utility: Generate Amazon-style Order Id
const generateOrderId = () => "ORD_" + Date.now();


// ---------------------------------------------------------
// 1️⃣ CREATE ORDER (Before Payment)
// ---------------------------------------------------------
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address required" });
    }

    // Create Amazon-style order id
    const orderId = generateOrderId();

    const newOrder = await Order.create({
      orderId,
      user: userId,
      items,
      shippingAddress,
      totalAmount,
      paymentStatus: "PENDING",
      orderStatus: "PLACED",
    });

    res.json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------------------------------------------------------
// 2️⃣ GET SINGLE ORDER
// ---------------------------------------------------------
exports.getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId })
      .populate("payment")
      .populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------------------------------------------------------
// 3️⃣ GET ALL ORDERS FOR USER
// ---------------------------------------------------------
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("payment");

    res.json(orders);
  } catch (err) {
    console.error("Get user orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------------------------------------------------------
// 4️⃣ UPDATE ORDER STATUS (Admin / System)
// ---------------------------------------------------------
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "PLACED",
      "CONFIRMED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
      "RETURNED",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------------------------------------------------------
// 5️⃣ DOWNLOAD INVOICE PDF
// ---------------------------------------------------------
exports.downloadInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId })
      .populate("payment")
      .populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const payment = await Payment.findById(order.payment);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const pdfBuffer = await generateInvoice(order, payment);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Invoice_${orderId}.pdf`
    );

    res.send(pdfBuffer);
  } catch (err) {
    console.error("Invoice error:", err);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};
