const express = require('express')
const router = express.Router();
const controler = require('../controllers/controller')
const jwt = require('jsonwebtoken')



const authonticate = function(req,res,next){
    let token = req.headers["x-auth-token"];
    if (!token) {return res.send({ status: false, msg: "token must be present" });}

    let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });
    
    let id = req.params.userid
    if(id == decodedToken.userId){
      console.log({status:"token is valid and user match" ,msg :decodedToken})
      next()
    }
    else{
      res.send({status: "Not valid token for particular user",msg :decodedToken})
    }
    
}



router.post('/createUser',controler.createUser)
router.post('/loginUser', controler.loginUser)
router.get('/user/:userid', authonticate,controler.user)
router.put('/updateUser/:userid', authonticate,controler.updateUser)
router.put('/deleteUser/:userid', authonticate,controler.deleteUser)



module.exports = router;