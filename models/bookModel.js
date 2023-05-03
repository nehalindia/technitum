// import package
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

//creates schema
const bookSchema = new mongoose.Schema( {
    name: String,
    author_id: {
        type: ObjectId,
        ref: "LibraryAuthor"
    }, 
    price: Number,
    rating: Number,
    publisher_id: {
        type: ObjectId,
        ref: "LibraryPublisher"
    },
    isHardCover:{
        type: Boolean,
        default:true
    }
}, { timestamps: true });

//makes pulic and wrap
module.exports = mongoose.model('LibraryBook', bookSchema)