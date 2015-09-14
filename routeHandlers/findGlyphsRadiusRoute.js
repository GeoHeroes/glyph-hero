var Promise = require('bluebird');
var app = require('../app/app');

var findGlyphsRadiusRoute = function(req, res) {
  var glyph = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    radius: req.body.radius
  }
  var findGlyphsRadiusRoutine = Promise.coroutine(function*(){
    var foundGlyphs = yield app.findGlyphsRadius(glyph.latitude, glyph.longitude, glyph.radius);
    res.send({success: true, glyphs: foundGlyphs});
  });
  findGlyphsRadiusRoutine();
}

module.exports = findGlyphsRadiusRoute;