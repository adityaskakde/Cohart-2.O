const express = require('express')
const songController = require('../controllers/songController')
const upload = require('../middlewares/upload.middleware')

const router = express.Router()

router.post('/',upload.single('song'),songController.uploadSong)

router.get('/',songController.getAllSongs)

module.exports = router


