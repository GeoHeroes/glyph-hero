var Promise = require('bluebird');
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

var fetchData = Promise.coroutine(function*(documentIDs) {
  // Mapping Strings of ids to Object ids
  var objectIDs = documentIDs.map(function(id) {
    return new ObjectID(id);
  });

  // Takes Object ids and finds all of the document data corresponding to those ids
  var documentData = yield db.glyphData.find({
    '_id': { $in: objectIDs}
  });

  // Take the ids and convert them into strings
  return documentData.map(function(data) {
    data._id = data._id.toString();
    return data; 
  });
});

module.exports = fetchData;