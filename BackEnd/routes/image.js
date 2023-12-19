const express = require('express')
const {uploadProfile, uploadPicture, myPictures} = require('../controllers/imageController')
const multer = require('multer');
const storage = multer.memoryStorage();
const multerUpload = multer({ storage });
const router = express.Router()

router.post('/profile', multerUpload.single('file'), uploadProfile);
router.post('/picture', multerUpload.single('file'), uploadPicture);
router.get('/myPictures', myPictures)

module.exports = router