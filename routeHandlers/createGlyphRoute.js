var Promise = require('bluebird');
var app = require('../app/app');

var createGlypheRoute = function(req, res) {
  var glyph = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    data: req.body.data
  }
  var createGlyphRoutine = Promise.coroutine(function*(){
    var newGlyphID = yield app.createGlyph(glyph.latitude, glyph.longitude, glyph.data);
    res.send({success: true, glyphID: newGlyphID});
  });
  createGlyphRoutine();
}

module.exports = createGlypheRoute;