const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectID,
        ref:"newuser"
    },
    productId :{
        type : mongoose.Schema.Types.ObjectID,
        ref : "product"
    },
    amount : Number,
    isFreeAppUser:Boolean
},{timestamps : true})


module.exports = mongoose.model('order',orderSchema)