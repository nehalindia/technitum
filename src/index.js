const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const route = require('./routes/route');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));

mongoose.connect("mongodb+srv://nehaluddindpe:RCGtWC3HqBQUfNeR@cluster0.wzbtyg0.mongodb.net/nehal01", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/',route);

app.listen(process.env.PORT || 3000, function(){
    console.log("server has started on "+ (process.env.PORT || 3000))
});