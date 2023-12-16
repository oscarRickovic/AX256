const express = require('express')
const {upload} = require('../controllers/imageController')
const multer = require('multer');
const storage = multer.memoryStorage();
const multerUpload = multer({ storage });
const router = express.Router()

router.post('/', multerUpload.single('file'), upload);

module.exports = router