var Promise = require('bluebird');
var wipeDocumentStore = require('./documentStore/utils/wipeDocumentStore');
var wipeGIS = require('./postGIS/utils/wipeGIS');

var wipeGISAndDocumentStore = Promise.coroutine(function*(){
  yield wipeDocumentStore();
  yield wipeGIS();
});

exports.wipeDocumentStore = wipeDocumentStore;
exports.wipeGIS = wipeGIS;
exports.wipeGISAndDocumentStore = wipeGISAndDocumentStore;