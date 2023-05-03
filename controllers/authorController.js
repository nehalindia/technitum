//import module
const AuthorModel= require("../models/authorModel")

//create new author
const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}

//select all author
const getAuthorsData= async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({data: authors})
}

//makes public
module.exports.createAuthor= createAuthor
module.exports.getAuthorsData= getAuthorsData