const express = require('express')
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    checkUserJwt
  } = require('../controllers/preUserController')

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

router.post('/checkUserJwt', checkUserJwt);


module.exports = router