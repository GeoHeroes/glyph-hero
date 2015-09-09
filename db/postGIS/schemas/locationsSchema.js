var db = require('../db');
var Promise = require('bluebird');

var createLocationsTable = Promise.coroutine(function*() {
  var exists = yield db.schema.hasTable('locations');
  if (!exists) {
    yield db.schema.createTable('locations', function(table) {
      table.increments();
      table.string('name');
      table.string('address');  
      table.text('description');
      table.timestamps();
    });
    yield db.raw('ALTER TABLE locations ADD COLUMN geo GEOMETRY');
  }
});

module.exports = createLocationsTable;