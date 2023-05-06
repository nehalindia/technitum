// Package importation 
const express = require('express');
const bodyParser = require('body-parser');
const route = require('../routes/route.js');
const moments = require('moment')
const app = express();

//MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const logger = (req,res,next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log(`${moments().format()}`);
    console.log(`${req.ip}`);
    next();
}


app.use('/',logger, route);


//server start
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
