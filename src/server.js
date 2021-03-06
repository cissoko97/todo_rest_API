const envs = require('./utils/config');
//TODO: require express for route manager
const express = require('express');
//TODO require body parser for 
const bodyParser = require('body-parser');
//TODO require package for cross origin 
const cors = require('cors');
//routes importation 
const { apiRoutes } = require('./routes/apiRouter');
const { uploadRoutes } = require('./controllers/uploadController');

const PORT = envs.PORT || 4555;
const HOST = 'localhost';

//var urlencodedParser = body.urlencoded({ extended: false });
const app = express();
app
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/api/',
        apiRoutes,
        uploadRoutes)
    .listen(PORT, HOST, function () {
        console.log(`Server start on ${HOST}:${PORT}`);
    });