const express = require('express')
const messageController = require('../controllers/messageController')
const checkUserJwtMiddleWare = require('../MiddleWare/checkUserJWT');
const router = express.Router()

router.get("/:friendShipId", messageController.getMessages);

module.exports = router