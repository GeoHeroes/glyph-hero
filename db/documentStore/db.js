var Promise = require("bluebird");
Promise.promisifyAll(require("mongodb"));
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/glyph-data';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server');
  db.close();
});
