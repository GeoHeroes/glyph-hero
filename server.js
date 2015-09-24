var express = require('express');
var errorHandler = require('./errorHandler');
var config = require('./config');
var GIS = require('./db/postGIS/db');
var server = express();
var docStore = require('./db/documentStore/db');
var bodyParser = require('body-parser');
var addRoutes = require('./routing');
var cors = require('cors');

var port = config.port;

server.use(bodyParser.json());
server.use(cors());

addRoutes(server);

//error handling middleware applied last
server.use(errorHandler);

server.listen(port, function() {
  console.log('Server is listening on:' + port);
});