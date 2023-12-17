const express = require('express')
const checkUserJwtMiddleWare = require('../MiddleWare/checkUserJWT');
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    checkUserJwt
  } = require('../controllers/userController')

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET a single user
router.get('/:id', getUser)

// POST a new user
router.post('/', createUser)

// POST login user
router.post('/login', loginUser)

// DELETE a user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)

// Check the user JWT
router.post('/checkUserJwt',checkUserJwtMiddleWare ,checkUserJwt);

module.exports = router