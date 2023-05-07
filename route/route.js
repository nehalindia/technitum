const express = require('express')
const router = express.Router();
const controler = require('../controller/controller')


const middleware =function(req,res,next){
    if(req.headers.isfreeappuser==""){
        res.send( {msg : "Pls Add header"} )
    }
    else{next()}
}


router.post('/createUser', middleware,controler.createUser)
router.post('/createProduct', controler.createProduct)
router.post('/createOrder', middleware,controler.createOrder)



module.exports = router;