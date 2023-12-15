const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imageSchema = new Schema({
    // we can choose between using the _id or email.
    owner : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }, 
    image : {
        type : Buffer,
        required : true
    }
  
}, { timestamps: true })

module.exports = mongoose.model('image', imageSchema)