const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    author_id : Number,
    author_name : String,
    age : Number,
    address : String
},{timestamps: true})

const bookSchema = new mongoose.Schema({
    name : String,
    author_id : Number,
    price : Number,
    ratings : Number
},{ timestamps : true})

module.exports.author = mongoose.model("author", authorSchema)
module.exports.book = mongoose.model("mongo-3-book",bookSchema)