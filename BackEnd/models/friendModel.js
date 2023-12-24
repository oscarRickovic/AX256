const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendSchema = new Schema({
    //using ids.
    user1 : {
        type : String,
        required : true
    },
    user2: {
        type : String,
        required : true
    }
}, { timestamps: true })

module.exports = mongoose.model('friend', friendSchema)