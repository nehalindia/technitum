//import package
const mongoose = require('mongoose')
//create schema
const publisherSchema = new mongoose.Schema({
    name : String,
    headQuater : String
},{ timestamps: true});

//makes public and wrap
module.exports = mongoose.model('LibraryPublisher', publisherSchema)