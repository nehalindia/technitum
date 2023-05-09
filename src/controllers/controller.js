const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')



const createUser = async function(req,res){
    let data = req.body
    let saveData = await userModel.create(data)
    res.send({ msg : saveData})
}

const loginUser = async function(req,res){
    let data = req.body
    let saveData = await userModel.findOne({emailId: data.emailId, password:data.password})
    if(!saveData){res.send({status:false,Msg:"Wrong EmailId and password"})}
    let token =    await jwt.sign({
        userId : saveData._id.toString(),
        batch : "Technatioum",
        organization : "FunctionUP"
    },
    "functionup-plutonium-very-very-secret-key"
    );
    
    res.setHeader('x-auth-token', token);
    console.log(res)
    res.send({ status : true, token:token})
}

const user = async function(req,res){
    
    let id = req.params.userid
    let userData = await userModel.findById(id)
    if (!userData)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userData });

}

const updateUser = async function(req,res){
    let id = req.params.userid
    let user = await userModel.findById(id)
    if(!user){ return res.send({msg : "user not found"})}

    let userdata =req.body
    let saveData = await userModel.findOneAndUpdate( { _id:id } , userdata,{new : true});
    res.send({ status: saveData, data: saveData });
}

const deleteUser = async function(req,res){
    let id = req.params.userid
    console.log(id)
    let user = await userModel.findById(id)
    if(!user){ return res.send({msg : "user not found"})}

    let userdata =req.body
    console.log(userdata)
    let saveData = await userModel.findOneAndUpdate( { _id:id } , userdata,{new : true});
    res.send({ status: saveData, data: saveData });
}


module.exports.createUser = createUser
module.exports.loginUser = loginUser
module.exports.user = user
module.exports.updateUser =updateUser
module.exports.deleteUser = deleteUser