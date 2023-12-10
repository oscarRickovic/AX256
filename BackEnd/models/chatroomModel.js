const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatroomSchema = new Schema({
  user1_id: {
    type: Number,
    required: true
  },
  user2_id: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Chatroom', chatroomSchema)