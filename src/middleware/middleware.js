const jwt = require('jsonwebtoken')

const authorisation = function(req,res,next){
    let token = req.headers["x-auth-token"];
    if (!token) {return res.status(400).send({ status: false, msg: "token must be present" });}

    let decodedToken
    try{
        decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
    }catch(error){
        return res.status(403).send({ status: false, msg: "token is invalid", Error: error });
    }

    let id = req.params.userid
    if(id == decodedToken.userId){
      console.log({status:"token is valid and user match"})
      res.status(202)
      next()
    }
    else{
      res.status(401).send({status: "You are not authorize person!",msg :decodedToken})
    }
}

module.exports.authorisation = authorisation