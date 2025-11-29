const mongoose = require("mongoose")
const Artwork = require('../models/Artwork')
const cloudinary = require('../config/cloudinary')

const getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find()
    res.json(artworks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getArtworkById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid artwork ID" })
    }

    const artwork = await Artwork.findById(id)

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" })
    }

    res.json(artwork)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ✅ NEW – UPDATE ARTWORK
const updateArtwork = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid artwork ID" })
    }

    let updatedData = { ...req.body }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path)
      updatedData.image = result.secure_url
    }

    const updatedArtwork = await Artwork.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    )

    if (!updatedArtwork) {
      return res.status(404).json({ message: "Artwork not found" })
    }

    res.json(updatedArtwork)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createArtwork = async (req, res) => {
  try {
    const file = req.file
    let imageUrl = ''

    if (file) {
      const result = await cloudinary.uploader.upload(file.path)
      imageUrl = result.secure_url
    }

    const artwork = await Artwork.create({
      ...req.body,
      image: imageUrl
    })

    res.json(artwork)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid artwork ID" })
    }

    const artwork = await Artwork.findByIdAndDelete(id)

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" })
    }

    res.json({ message: "Artwork deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork
}
