const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    author_id : Number,
    author_name : String,
    age : Number,
    address : String
},{timestamps: true})

const bookSchema = new mongoose.Schema({
    name : String,
    price : Number,
    ratings : Number,
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'author'
    }
},{ timestamps : true})

module.exports.author = mongoose.model("author", authorSchema)
module.exports.book = mongoose.model("mongo-3-book",bookSchema)