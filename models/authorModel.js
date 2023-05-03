//import pakage
const mongoose = require('mongoose');
//create schema
const authorSchema = new mongoose.Schema( {
    author_name: String,
    age:Number,
    address:String,
    rating : Number
}, { timestamps: true });
//makes public and wrap
module.exports = mongoose.model('LibraryAuthor', authorSchema)
