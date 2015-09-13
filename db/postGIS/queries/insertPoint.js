var GIS = require('../db');

/**
* Inserts a new point into the location database. Latitude / longitude are stored in their own columns,
* respectively, as well as in a geometry column that represents a single point. In addition, the method
* accepts a data parameter which is an object. The method expects that the key value pairs in that object
* represent actual column names and data to be placed in those columns. The method will loop through the
* object and insert each value into the column that corresponds to the key in the object.
*
* @method insertPoint
* @param {Number} latitude Latitude of the point to insert
* @param {Number} longitude Longitude of the point to insert
* @param {Object} data key-value pairs representing column names in the table and the values to put in them
* @return {Pormise} Returns a promise that will resolve with the results of the insert
*/ 

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

  var insertSQL = `INSERT INTO locations (latitude, longitude, geo${columnSQL}) 
                   VALUES (${latitude}, ${longitude}, ST_GeomFromText('POINT(${latitude} ${longitude})')${valueSQL})`

  return GIS.raw(insertSQL);
}

module.exports = insertPoint;