const mongoose = require('mongoose')

const Schema = mongoose.Schema

const preUserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  code: {
    type: String,
  },
  isVerified: {
    type : Boolean,
    required: true,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('preUser', preUserSchema)