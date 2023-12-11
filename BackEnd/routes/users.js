const express = require('express')
const Users = require('../models/userModel')

const router = express.Router()

// GET all users
router.get('/', (req, res) => {
  res.json({mssg: 'GET all users'})
})

// GET a single user
router.get('/:id', (req, res) => {
  res.json({mssg: 'GET a single user'})
})

// POST a new user
router.post('/register', async (req, res) => {
  const {username, email, password} = req.body
  
  try {
    const newUser = await Users.create({username, email, password})
    res.status(200).json(newUser)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// DELETE a user
router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE a user'})
})

// UPDATE a user
router.patch('/:id', (req, res) => {
  res.json({mssg: 'UPDATE a user'})
})

module.exports = router