const express = require('express')
const checkUserJwtMiddleWare = require('../MiddleWare/checkUserJWT');
const updateUserMiddleWare = require('../MiddleWare/updateUserMiddleWare');
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    checkUserJwt,
    checkUserPassword
  } = require('../controllers/userController');

const router = express.Router()

// GET all users
router.get('/', checkUserJwtMiddleWare, getUsers)

// GET a single user
router.get('/:id', checkUserJwtMiddleWare, getUser)

// POST a new user
router.post('/', createUser)

// POST login user
router.post('/login', loginUser)

// DELETE a user
router.get('/blockUser/:id', checkUserJwtMiddleWare ,deleteUser)

// UPDATE a user
router.post('/updateMyProfile',checkUserJwtMiddleWare,updateUserMiddleWare ,updateUser)

// Check the user JWT
router.post('/checkUserJwt',checkUserJwtMiddleWare ,checkUserJwt);

// Check user password before update profile.
router.post('/checkUserPassword', checkUserJwtMiddleWare, checkUserPassword);

module.exports = router