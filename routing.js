var createGlyphRoute = require('./routeHandlers/createGlyphRoute');
var findGlyphsRadiusRoute = require('./routeHandlers/findGlyphsRadiusRoute');

var routes = {
  '/api/createGlyph': createGlyphRoute,
  '/api/findGlyphsRadius': findGlyphsRadiusRoute
}

var router = function(server) {
  for (var route in routes) {
    server.post(route, routes[route]);
  }
}

module.exports = router;