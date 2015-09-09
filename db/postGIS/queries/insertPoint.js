var GIS = require('../db');

var insertPoint = function(latitude, longitude, data) {
  var columnSQL = "";
  var valueSQL = "";
  for (var key in data) {
    columnSQL += `,${key}`
    if (typeof data[key] === 'string') {
      valueSQL += `,'${data[key]}'`
    }
    else {
      valueSQL += `,${data[key]}`
    }
  }

  var insertSQL = `INSERT INTO locations (geo${columnSQL}) 
                   VALUES (ST_GeomFromText('POINT(${latitude} ${longitude})')${valueSQL})`

  return GIS.raw(insertSQL);
}

module.exports = insertPoint;