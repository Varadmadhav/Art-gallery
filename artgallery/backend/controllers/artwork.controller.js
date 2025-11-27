const Artwork = require('../models/Artwork')
const cloudinary = require('../config/cloudinary')

const getAllArtworks = async (req, res) => {
  const artworks = await Artwork.find()
  res.json(artworks)
}

const getArtworkById = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id)
  res.json(artwork)
}

const createArtwork = async (req, res) => {
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
}

const deleteArtwork = async (req, res) => {
  await Artwork.findByIdAndDelete(req.params.id)
  res.json({ message: 'Artwork deleted' })
}

module.exports = { getAllArtworks, getArtworkById, createArtwork, deleteArtwork }
