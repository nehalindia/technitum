const express = require('express')
const app = express()
const bodyparse = require('body-parser')
const route = require('../route/route.js')
const {default: mongoose} = require('mongoose')

app.use(bodyparse.json())
app.use(bodyparse.urlencoded({ extended : true}))

mongoose.connect("mongodb+srv://nehaluddindpe:RCGtWC3HqBQUfNeR@cluster0.wzbtyg0.mongodb.net/nehal01", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/',route)

app.listen(process.env.PORT ||3000,function(){
    console.log("Express is running on port "+ (process.env.PORT ||3000 ))
})