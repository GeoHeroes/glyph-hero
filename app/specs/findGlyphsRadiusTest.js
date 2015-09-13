var Promise = require('bluebird');
var should = require('should');
var findGlyphsRadius = require('../findGlyphsRadius');
var GIS = require('../../db/postGIS/db');
var docStore = require('../../db/documentStore/db');

xdescribe('app logic', function() {
  describe('findGlyphsRadius()', function() {
    it('should return an array of document data when given an array of documentt IDs', function(done) {
      var findGlyphsRadiusTest = Promise.coroutine(function*() {
        done();
      });
      findGlyphsRadiusTest();
    });
  });
});