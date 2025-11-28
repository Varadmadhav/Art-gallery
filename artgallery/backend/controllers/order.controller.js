const Order = require("../models/Order")
const User = require("../models/User")
const Artwork = require("../models/Artwork")

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.artwork", "title image price")
      .sort({ createdAt: -1 })

    res.status(200).json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments()

    const totalSalesAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ])

    const totalSales = totalSalesAgg.length ? totalSalesAgg[0].total : 0

    const totalArtworks = await Artwork.countDocuments()

    const totalCustomers = await User.countDocuments({ role: "user" })

    res.json({
      totalOrders,
      totalSales,
      totalArtworks,
      totalCustomers
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.artwork", "title")
      .sort({ createdAt: -1 })
      .limit(10)

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getCustomersFromOrders = async (req, res) => {
  try {
    const customers = await Order.aggregate([
      {
        $group: {
          _id: "$user",
          orders: { $sum: 1 },
          spent: { $sum: "$totalAmount" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          name: "$user.name",
          email: "$user.email",
          orders: 1,
          spent: 1
        }
      }
    ])

    res.json(customers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
