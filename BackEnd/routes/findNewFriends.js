const express = require('express')
const findNewFriendsController = require('../controllers/findNewFriendsController')

const router = express.Router()

router.get('/', findNewFriendsController.getNewFriend);

module.exports = router