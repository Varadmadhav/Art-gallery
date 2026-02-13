const Commission = require("../models/Commission")
const cloudinary = require("cloudinary").v2

exports.createCommission = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      artworkType,
      size,
      budget,
      deadline,
      message
    } = req.body

    let imageUrls = []

    if (req.files) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "commissions"
        })
        imageUrls.push(result.secure_url)
      }
    }

    const commission = await Commission.create({
      fullName,
      email,
      phone,
      artworkType,
      size,
      budget,
      deadline,
      message,
      images: imageUrls
    })

    res.json({
      success: true,
      message: "Commission saved",
      commission
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error creating commission"
    })
  }
}

exports.getAllCommissions = async (req, res) => {
  try {
    const commissions = await Commission.find().sort({ createdAt: -1 })

    res.json({
      success: true,
      commissions
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching commissions"
    })
  }
}
