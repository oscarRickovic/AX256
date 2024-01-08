const mongoose = require('mongoose')

const Schema = mongoose.Schema

// those two friends blocket each others.
// they should not be appear in "add new friends"

const blackListSchema = new Schema({
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

module.exports = mongoose.model('blackList', blackListSchema);