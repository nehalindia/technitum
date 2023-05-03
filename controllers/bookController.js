//import module/pakage
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")
const authorModel = require("../models/authorModel")
const ObjectId = require("mongoose").Types.ObjectId

// add book in database
const createBook= async function (req, res) {
    let book = req.body
    // validating id
    if( !book.author_id ){ res.send({ msg : "authorId is missing in data"})}
    else if( !book.publisher_id ){ res.send({ msg : "publisherId is missing in data"})}
    else if( !ObjectId.isValid(book.author_id )){ res.send({msg : "Author id is not valid"}) }
    else if( !ObjectId.isValid(book.publisher_id )){ res.send({msg : "Publisher id is not valid"}) }
    else{
        // matche the id with author and publisher
        let authorMatch = await authorModel.findById(book.author_id)
        let publisherMatch = await publisherModel.findById(book.publisher_id)
        if( !authorMatch ){ res.send({ msg : "authorId is not available in database"})}
        else if( !publisherMatch ){ res.send({ msg : "publisherId is not available in database"})}
        else{

            //add into book collection
            let bookCreated = await bookModel.create(book)
            res.send({ msg: bookCreated})
        }
    }
}

// select all book
const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

//select book with auther and publisher details
const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id').populate('publisher_id')
    res.send({data: specificBook})

}
// add new attribute
const createAttribute = async function(req,res){
    // select all id
    let getdata = await bookModel.find().select({_id:1})
    let arr=[]
    let data = req.body
    // adding new attribute in every document
    for(let i=0; i<getdata.length; i++){
        let savedata = await bookModel.updateMany(
            {_id : getdata[i]._id}, 
            {$set :data},
            {new:true,upsert :true},
        );
        arr.push(savedata)
    }
    let arr1=[]
    //slect the id of given publisher
    let selectpublisher = await publisherModel.find({ $or:[{name:"pinguien"},{name:"HarperCollins"}] }).select({_id:1})
    //updates the value to true
    for(let i=0;i<selectpublisher.length; i++){
        let saveData = await bookModel.updateOne(
            {publisher_id: selectpublisher[i]._id},
            { $set : {isHardCover:true}},
            {new :true, upsert:true},
            )
        arr1.push(saveData)
    }
    res.send({ msg : arr})
}

//update the price 
const updateRating = async function(req,res){
    //select authpor id those rating is higher then 3.5
    let selectauthor = await authorModel.find({rating :{ $gt : 3.5}}).select({_id:1})
    let arr =[]
    //increas the price of book of selected author
    for(let i=0; i<selectauthor.length; i++){
        let saveData = await bookModel.updateMany(
            { author_id :selectauthor[i]._id },
            { $inc : { price : 10 }}
        );
        arr.push(saveData)
    }
    res.send({msg : arr})
}

//makes public
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.createAttribute = createAttribute
module.exports.updateRating = updateRating