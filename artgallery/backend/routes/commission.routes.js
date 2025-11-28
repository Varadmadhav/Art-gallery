const express = require("express")
const router = express.Router()
const {
  createCommission,
  getAllCommissions
} = require("../controllers/commission.controller")

const multer = require("multer")
const upload = multer({ dest: "uploads/" })

router.post("/create", upload.array("images", 5), createCommission)
router.get("/", getAllCommissions)

module.exports = router
