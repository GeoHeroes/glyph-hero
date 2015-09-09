var insertPoint = require('../queries/insertPoint');
var Promise = require('bluebird');
var should = require('should');
var GIS = require('../db');
var deleteTable = require('./utils/deleteTable');

describe('postGIS Queries', function() {
  before(function(done) {
    deleteTable('locations', done);
  });
  after(function(done) {
    deleteTable('locations', done);
  });
  describe('insertPoint()', function() {
    it('should insert a point into the database, along with any provided data', function(done) {
      var testInsertPoint = Promise.coroutine(function*() {
        var insertResult = yield insertPoint(25,25, {name: "Falafel House"})
        insertResult.command.should.equal('INSERT');
        insertResult.rowCount.should.equal(1);
        var queryResult = yield GIS.select('*').from('locations').where({name: 'Falafel House'});
        queryResult.length.should.equal(1);
        queryResult[0].name.should.equal('Falafel House');
        queryResult[0].geo.should.equal('010100000000000000000039400000000000003940');
        done();
      });
      testInsertPoint();
    });
  });
});