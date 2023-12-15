const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
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
  gender : {
    type : String,
    enum : ['male', 'female']
  },
  profilePicture : {
    type : String
  },
  isOnline : {
    type : Boolean,
    default : false
  }  
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)