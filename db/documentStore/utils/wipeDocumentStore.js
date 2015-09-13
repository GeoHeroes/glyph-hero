var Promise = require('bluebird');
var docStore = require('../db');

module.exports = Promise.coroutine(function*() {
  yield docStore.glyphData.remove({});
});
