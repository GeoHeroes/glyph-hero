var db = require('../db');

var deleteData = function(data) {
  return db.glyphData.remove(data)  
};

module.exports = deleteData;