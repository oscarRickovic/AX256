const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imageSchema = new Schema({
    // we can choose between using the _id or email.
    owner : {
        type : String,
        required : true
    },
    // the image name that will be stored in public/imagesStore
    // The name should be unique using uuid4
    name : {
        type : String,
        required : true
    }
}, { timestamps: true })

module.exports = mongoose.model('image', imageSchema)