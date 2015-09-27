var Promise = require('bluebird');
var GIS = require('../db/postGIS/queries/postGISQueries');
var docStore = require('../db/documentStore/queries/documentStoreQueries');

var findGlyphsRadius = Promise.coroutine(function*(latitude, longitude, radius) {
  var glyphGeolocationData = yield GIS.findPointsRadius(latitude, longitude, radius);
  var glyphIDs = glyphGeolocationData.map(function(glyph) {
    return glyph.glyphid
  });
  var glyphData = yield docStore.fetchData(glyphIDs);

  // Merge postGIS data with Mongo data
  return glyphData.map(function(data, index) {
    var glyph = {};
    glyph.data = data;
    glyph.id = data._id;
    delete data._id;
    glyph.longitude = glyphGeolocationData[index].longitude;
    glyph.latitude = glyphGeolocationData[index].latitude; 
    return glyph; 
  });
});

module.exports = findGlyphsRadius;