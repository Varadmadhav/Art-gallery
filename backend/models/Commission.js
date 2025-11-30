const mongoose = require("mongoose")

const CommissionSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  artworkType: String,
  size: String,
  budget: String,
  deadline: String,
  message: String,
  images: [String],
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Commission", CommissionSchema)
