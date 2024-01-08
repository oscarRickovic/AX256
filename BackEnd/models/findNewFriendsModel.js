const mongoose = require('mongoose')

const Schema = mongoose.Schema

const findNewFriendsSchema = new Schema({
    //using ids.
    user : {
        type : String,
        required : true
    }
}, { timestamps: true })

module.exports = mongoose.model('findNewFriends', findNewFriendsSchema);