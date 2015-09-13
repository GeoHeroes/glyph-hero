var Promise = require('bluebird');
var GIS = require('../db');

module.exports = Promise.coroutine(function*() {
  yield GIS('locations').delete();
})