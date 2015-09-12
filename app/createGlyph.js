var Promise = require('bluebird');
var GIS = require('../db/postGIS/queries/postGISQueries');
var docStore = require('../db/documentStore/queries/documentStoreQueries');

var createGlyph = Promise.coroutine(function*(latitude, longitude, data) {
  var documentID = yield docStore.insertData(data);
  var GISInsertResult = yield GIS.insertPoint(latitude, longitude, {glyphid: documentID});

  return documentID;  
});

module.exports = createGlyph;