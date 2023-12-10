const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imageSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  user_id: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Image', imageSchema)