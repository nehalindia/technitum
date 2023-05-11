const express = require('express')
const router = express.Router();
const controler = require('../controllers/controller')
const middleware = require('../middleware/middleware')


// const authonticate = function(req,res,next){
//     let token = req.headers["x-auth-token"];
//     if (!token) {return res.send({ status: false, msg: "token must be present" });}

//     let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
//     if (!decodedToken)
//       return res.send({ status: false, msg: "token is invalid" });
    
//     let id = req.params.userid
//     if(id == decodedToken.userId){
//       console.log({status:"token is valid and user match"})
//       next()
//     }
//     else{
//       res.send({status: "Not valid token for particular user",msg :decodedToken})
//     }
// }



router.post('/createUser',controler.createUser)
router.post('/loginUser', controler.loginUser)
router.get('/user/:userid', middleware.authorisation, controler.user)
router.put('/updateUser/:userid', middleware.authorisation, controler.updateUser)
router.put('/deleteUser/:userid', middleware.authorisation, controler.deleteUser)



module.exports = router;