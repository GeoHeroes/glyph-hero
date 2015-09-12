var Promise = require('bluebird');
var should = require('should');
var createGlyph = require('../createGlyph');
var GIS = require('../../db/postGIS/db');
var docStore = require('../../db/documentStore/db');
var ObjectID = require('mongodb').ObjectID;

describe('app logic', function() {
  describe('createGlyph()', function() {
    it('should create a new glyph with its coordinates and data', function(done) {
      var createGlyphTest = Promise.coroutine(function*() {
        // createGlyph returns the documentid of the created glyph
        var createGlyphResult = yield createGlyph(25, 25, {name: "yolo"});
        var GISResult = yield GIS.select('*').from('locations').where({glyphid: createGlyphResult});
        // need to convert id from string to ObjectID type for mongo to understand
        var docStoreResult = yield docStore.glyphData.find({_id: new ObjectID(createGlyphResult)});

        GISResult[0].glyphid.should.equal(createGlyphResult);
        docStoreResult[0].name.should.equal('yolo');

        done();
      });
      createGlyphTest();
    });
  });
});