var Promise = require('bluebird');
var GIS = require('../../db');

module.exports = function(tableName, callback) {
  var deleteTableRoutine = Promise.coroutine(function*() {
    yield GIS(tableName).delete();
    callback();
  });
  deleteTableRoutine();
}