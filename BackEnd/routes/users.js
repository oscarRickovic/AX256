const express = require('express')
const checkUserJwtMiddleWare = require('../MiddleWare/checkUserJWT');
const updateUserMiddleWare = require('../MiddleWare/updateUserMiddleWare');
const {
    getUsers,
    getUser,
    getFriendShipUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    checkUserJwt,
    checkUserPassword,
    setLine
  } = require('../controllers/userController');

const router = express.Router()

// GET all users
router.get('/', checkUserJwtMiddleWare, getUsers)

// connect and deconnect.
router.get('/onLine', checkUserJwtMiddleWare, (req, res, next) => {
  req.line = true;
  next();
}, setLine);

router.get('/offLine', checkUserJwtMiddleWare, (req, res, next) => {
  req.line = false;
  next();
}, setLine);

// GET a single user
router.get('/:id', checkUserJwtMiddleWare,getUser)

// GET a single user
router.get('/friendShip/:id', checkUserJwtMiddleWare,getFriendShipUser)

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