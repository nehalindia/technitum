//import module
const publisherModel = require("../models/publisherModel")

//creates publisher
const createPublisher = async function(req,res){
    let data = req.body
    let saveData = await publisherModel.create(data)
    res.send({msg : saveData})
}
//select all publisher
const getPublisher = async function(req,res){
    let saveData = await publisherModel.find()
    res.send({msg : saveData})
}

//public
module.exports.createPublisher = createPublisher
module.exports.getPublisher = getPublisher