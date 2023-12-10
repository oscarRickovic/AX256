const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  sender_id: {
    type: Number,
    required: true
  },
  receiver_id: {
    type: Number,
    required: true
  },
  room_id: {
    type: String,
    required: true
  }
  
}, { timestamps: true })

module.exports = mongoose.model('Message', messageSchema)