const ObjectID = require('mongoose').Types.ObjectId
const userModel = require('../model/userModel')
const orderModel = require('../model/orderModel')
const productModel = require('../model/productModel')

const createUser = async function(req,res){
    let data = req.body
    data.isFreeAppUser = req.headers.isfreeappuser
    let saveData = await userModel.create(data)
    res.send({ msg : saveData})
}
const createProduct = async function(req,res){
    let data = req.body
    let saveData = await productModel.create(data)
    res.send({ msg : saveData})
}
const createOrder = async function(req,res){
    let data = req.body
    if(!ObjectID.isValid(data.userId)){ res.send( {msg :"UserId is not Valid"})}
    else if(!ObjectID.isValid(data.productId)){ res.send( {msg :"ProductId is not Valid"})}
    else{
        let userMatch = await userModel.findById(data.userId)
        let productMatch = await productModel.findById(data.productId)
        if(!userMatch){ res.send({msg : "User Not found"})}
        else if(!productMatch){ res.send({msg : "Product Not found"})}
        else{
            let productPrice = await productModel.findById(data.productId).select({ price:1})
            let userbalance = await userModel.findById(data.userId).select( {balance:1} )
            let p = productPrice.price
            let b = userbalance.balance
            if( (b < p) && (req.headers.isfreeappuser=='false')){ res.send({msg : "Insufficient Balance"})}
            else if( ( b >= p) && (req.headers.isfreeappuser=='false')){
                let result = await userModel.updateOne({_id:data.userId },
                    {$set : {balance: (b-p) }},
                    {new:true}
                )
                data.amount = p
                data.isFreeAppUser = req.headers.isfreeappuser
                let saveData = await orderModel.create(data)
                res.send({msg : result,saveData})
            }
            else{
                data.amount = 0
                data.isFreeAppUser = req.headers.isFreeAppUser
                let saveData = await orderModel.create(data)
                res.send({ msg : saveData})
            }
           
        }
    }
}


module.exports.createUser = createUser
module.exports.createProduct =createProduct
module.exports.createOrder = createOrder