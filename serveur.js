//TODO require express for route manager
var express = require('express');
//TODO require body parser for 
var body = require('body-parser');
//TODO require package for cross origin 
var cors = require('cors');
//routes importation 
var routes = require('./apiRouter').router;

const PORT = 9000;
const HOST = 'localhost';

//var urlencodedParser = body.urlencoded({ extended: false });
var app = express();

app.use(cors())
    .use(body.json())
    .use(body.urlencoded({ extended: false }))
    .use('/api/', routes)
    .listen(PORT, HOST, function () {
        console.log(`serveur start on ${HOST}:${PORT}`);
    });