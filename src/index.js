// Package importation 
const express = require('express');
const bodyParser = require('body-parser');
const route = require('../routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

//parseing the data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//DataBase connectivity
mongoose.connect("mongodb+srv://nehaluddindpe:RCGtWC3HqBQUfNeR@cluster0.wzbtyg0.mongodb.net/nehal01", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

//routing url
app.use('/', route);

//server start
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
