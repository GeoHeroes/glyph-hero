var findPointsRadius = require('../queries/findPointsRadius');
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
  describe('findPointsRadius()', function() {
    it('should find all points in the database within a specified radius of a point', function(done) {
      var testFindPointsRadius = Promise.coroutine(function*() {
        var insertResult = yield insertPoint(25,25, {name: "Falafel House"});
        // within 15M of Falafel house
        var insertResult = yield insertPoint(25.0001,25.0001, {name: "Shawarma House"});
        // 150KM from Falafel house
        var insertResult = yield insertPoint(26,26, {name: "Hogie House"});

        var queryResult = yield findPointsRadius(25,25, 1);
        queryResult[0].name.should.equal("Falafel House");
        queryResult[1].name.should.equal("Shawarma House");

        var queryResult = yield findPointsRadius(25,25, 200);
        queryResult[0].name.should.equal("Falafel House");
        queryResult[1].name.should.equal("Shawarma House");
        queryResult[2].name.should.equal("Hogie House");

        done();
      });
      testFindPointsRadius();
    });
  });
});