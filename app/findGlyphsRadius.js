var Promise = require('bluebird');
var GIS = require('../db/postGIS/queries/postGISQueries');
var docStore = require('../db/documentStore/queries/documentStoreQueries');

var findGlyphsRadius = Promise.coroutine(function*(latitude, longitude, radius) {
  var documentIDs = yield GIS.findPointsRadius(latitude, longitude, radius);
  return yield docStore.fetchData(documentIDs);
});

module.exports = findGlyphsRadius;