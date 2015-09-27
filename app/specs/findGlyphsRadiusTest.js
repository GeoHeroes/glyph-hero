var Promise = require('bluebird');
var should = require('should');
var findGlyphsRadius = require('../findGlyphsRadius');
var GIS = require('../../db/postGIS/db');
var docStore = require('../../db/documentStore/db');
var createGlyph = require('../createGlyph');
var findGlyphsRadius = require('../findGlyphsRadius');
var dbUtils = require('../../db/dbUtils');

describe('app logic', function() {
  describe('findGlyphsRadius()', function() {
    after(function(done) {
      dbUtils.wipeGISAndDocumentStore().then(function() {
        done();
      });
    });

    it('should return an array of document data when given an array of document IDs', function(done) {
      var findGlyphsRadiusTest = Promise.coroutine(function*() {
        var testID1 = yield createGlyph(25, 25, {'name': 'test1'});
        var testID2 = yield createGlyph(25.0001, 25.0001, {'name': 'test2'});
        var testID3 = yield createGlyph(26, 26, {'name': 'test3'});
        var testIDsArray = [testID1, testID2, testID3];
        
        var glyphsData = yield findGlyphsRadius(25, 25, 1);
        glyphsData[0].data.name.should.equal('test1');
        glyphsData[0].id.should.equal(testID1);
        glyphsData[1].data.name.should.equal('test2');
        glyphsData[1].id.should.equal(testID2);

        var glyphsData = yield findGlyphsRadius(25, 25, 200);
        glyphsData[0].data.name.should.equal('test1');
        glyphsData[0].id.should.equal(testID1);
        glyphsData[1].data.name.should.equal('test2');
        glyphsData[1].id.should.equal(testID2);
        glyphsData[2].data.name.should.equal('test3');
        glyphsData[2].id.should.equal(testID3);

        done();
      });
      findGlyphsRadiusTest();
    });
  });
});
