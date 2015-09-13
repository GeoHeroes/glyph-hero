var Promise = require('bluebird');
var GIS = require('../db/postGIS/queries/postGISQueries');
var docStore = require('../db/documentStore/queries/documentStoreQueries');

var findGlyphsRadius = Promise.coroutine(function*(latitude, longitude, radius) {
  var glyphGeolocationData = yield GIS.findPointsRadius(latitude, longitude, radius);
  var glyphIDs = glyphGeolocationData.map(function(glyph) {
    return glyph.glyphid
  });
  return yield docStore.fetchData(glyphIDs);
});

module.exports = findGlyphsRadius;