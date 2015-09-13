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

      var testID1 = yield insertQuery({'name': 'test1'});
      var testID2 = yield insertQuery({'name': 'test2'});
      var testID3 = yield insertQuery({'name': 'test3'});
      
      var testIDsArray = [testID1, testID2, testID3];

      var fetchResult = yield fetchQuery(testIDsArray)
        fetchResult[0].name.should.equal('test1');
        fetchResult[0]._id.should.equal(testID1);
        fetchResult[1].name.should.equal('test2');
        fetchResult[1]._id.should.equal(testID2);
        fetchResult[2].name.should.equal('test3');
        fetchResult[2]._id.should.equal(testID3);
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