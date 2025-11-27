const mongoose = require('mongoose')

const ArtworkSchema = new mongoose.Schema({
  title: String,
  artist: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number
}, { timestamps: true })

module.exports = mongoose.model('Artwork', ArtworkSchema)
