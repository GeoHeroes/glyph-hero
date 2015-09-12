var db = require('../db');

var fetchData = function(data) {
  return db.glyphData.find(data)  
};

module.exports = fetchData;