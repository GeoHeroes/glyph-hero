var db = require('../db');

var insertData = function(data) {
  return db.glyphData.insert(data)
    .then(function(insertResult) {
      return insertResult._id.toString();
    });
};

module.exports = insertData;