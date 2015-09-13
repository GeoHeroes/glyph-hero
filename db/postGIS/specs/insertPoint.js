var insertPoint = require('../queries/insertPoint');
var Promise = require('bluebird');
var should = require('should');
var GIS = require('../db');
var wipeGIS = require('../utils/wipeGIS');

describe('postGIS Queries', function() {
  before(function(done) {
    wipeGIS('locations').then(function(){
      done();
    });
  });
  after(function(done) {
    wipeGIS('locations').then(function(){
      done();
    });
  });
  describe('insertPoint()', function() {
    it('should insert a point into the database, along with any provided data', function(done) {
      var testInsertPoint = Promise.coroutine(function*() {
        var insertResult = yield insertPoint(25,25, {name: "Falafel House"})
        insertResult.command.should.equal('INSERT');
        insertResult.rowCount.should.equal(1);
        var queryResult = yield GIS.select('*').from('locations').where({name: 'Falafel House'});
        queryResult.length.should.equal(1);
        queryResult[0].latitude.should.equal("25.000000");
        queryResult[0].longitude.should.equal("25.000000");
        queryResult[0].name.should.equal('Falafel House');
        queryResult[0].geo.should.equal('010100000000000000000039400000000000003940');
        done();
      });
      testInsertPoint();
    });
  });
});