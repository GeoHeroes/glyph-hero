var insertQuery = require('../queries/insertData');
var deleteQuery = require('../queries/deleteData');
var fetchQuery = require('../queries/fetchData');
var Promise = require('bluebird');
var should = require('should');
var db = require('../db');

var testData = {'name': 'test'};

describe('documentStore queries()', function() {
  after(function(done) {
    db.glyphData.remove({}).then(function() {
      done();
    });
  });

  it('should insert data into the document store', function(done) {
    var testInsertData = Promise.coroutine(function*() {
      var insertResult = yield insertQuery(testData)
      should(typeof insertResult).equal('string');
      done();
    });
    testInsertData();
  });

  it('should fetch data from the document store', function(done) {
    var testFetchData = Promise.coroutine(function*() {
      var fetchResult = yield fetchQuery(testData)
        fetchResult[0].name.should.equal('test');
        done();
    });
    testFetchData();
  });

  it('should delete data from the document store', function(done) {
    var testDeleteData = Promise.coroutine(function*() {
      var deleteResult = yield deleteQuery(testData)
        deleteResult.should.eql({'n': 1});
        done();
    });
    testDeleteData();
  });
});