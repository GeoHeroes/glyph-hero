var express = require('express');
var config = require('./config');
var GIS = require('./db/postGIS/db');
var app = express();
var mongoose = require('mongoose');
var docStore = require('./db/documentStore/db');

var port = config.port;

app.listen(port, function() {
  console.log('Server is listening on:' + port);
});