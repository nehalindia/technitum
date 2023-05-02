const models = require('../model/bookModel.js')

const check = async function(req, res){
    let data = await models.book.find().populate('author').select( {name:true, address:true, _id:0  })

    res.send({msg : data})
}

const createBook = async function(req,res){
    let reqdata = req.body
    if(reqdata.author_id>0){
        let data = await models.book.create(reqdata)
        res.send( {msg : data})
    }
    else{
        res.send( {Msg : "Add all fields"})
    }
}
const createAuthor = async function(req,res){
    let reqdata = req.body
    if(reqdata.author_id>0){
        let data = await models.author.create(reqdata)
        res.send( {msg : data})
    }
    else{
        res.send( {Msg : "Add all fields"})
    }
}

const bookName = async function(req,res){
    let author_detail = await models.author.findOne({author_name : "Chetan Bhagat"})
    let id = author_detail.author_id
    let booklist = await models.book.find( {author_id : id} ).select( {name : 1, _id:0})
    res.send({msg : booklist})
}
const findAuthor = async function(req,res){
    let data =  await models.book.findOneAndUpdate(
        {name : "Two states"},
        { $set :{ price : 100}},
        { new : true}
    ).select({ price: 1, author_id: 1, _id:0})
    let author = await models.author.findOne( { author_id : data.author_id}).select( {author_name : true, _id:0})
    res.send({msg : author, newPrice: data.price} )
}
const findAuthorInRange = async function(req, res){
    let authorId = await models.book.find( { price : {$gte : 50, $lte :100 }} ).select( { author_id :true, _id:false})

    // let authorName = []
    // for(let i=0; i<authorId.length; i++){
    //     authorName[i] = await models.author.find({ author_id : authorId[i].author_id}).select({ author_name : 1, _id:0})
    // }
    let author = await models.author.find()
    let authorName = authorId.map(e => {
        return ( author.find(book => book.author_id === e.author_id)).author_name
    })
    res.send( {msg : authorName } )
}


module.exports.check = check
module.exports.createBook = createBook
module.exports.createAuthor = createAuthor
module.exports.bookName = bookName
module.exports.findAuthorInRange = findAuthorInRange
module.exports.findAuthor = findAuthor