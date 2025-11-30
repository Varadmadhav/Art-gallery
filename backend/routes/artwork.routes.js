const express = require('express')
const multer = require('multer')
const { protect } = require('../middlewares/auth.middleware')

const {
  getAllArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork
} = require('../controllers/artwork.controller')

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

// Public
router.get('/', getAllArtworks)
router.get('/:id', getArtworkById)

// Protected (admin panel usage)
router.post('/', protect, upload.single('image'), createArtwork)
router.put('/:id', protect, upload.single('image'), updateArtwork)
router.delete('/:id', protect, deleteArtwork)

module.exports = router
