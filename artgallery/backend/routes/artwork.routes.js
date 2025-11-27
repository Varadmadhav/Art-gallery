const express = require('express')
const multer = require('multer')
const { getAllArtworks, getArtworkById, createArtwork, deleteArtwork } = require('../controllers/artwork.controller')

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.get('/', getAllArtworks)
router.get('/:id', getArtworkById)
router.post('/', upload.single('image'), createArtwork)
router.delete('/:id', deleteArtwork)

module.exports = router
