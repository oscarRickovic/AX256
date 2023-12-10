require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')

// express app
const app = express()

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT)
      })
  })
  .catch((err) => {
    console.log(err)
  }) 

