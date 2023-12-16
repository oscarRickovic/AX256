const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender : {
    type : String,
    enum : ['male', 'female']
  },
  bio : {
    type : String,
    default : "Hi there, can we know each other :)",
    maxlength: 100
  },
  // the unique name of profile image
  profilePicture : {
    type : String
  },
  isOnline : {
    type : Boolean,
    default : false
  }  
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)