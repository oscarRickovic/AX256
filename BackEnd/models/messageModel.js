const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    sender : {
        type : String,
        required : true
    },
    message: {
        type : String,
        required: true
    },
    friendShip:{
        type : String,
        required : true
    }
}, { timestamps: true })

module.exports = mongoose.model('message', MessageSchema)