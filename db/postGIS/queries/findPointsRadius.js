var GIS = require('../db');

/**
* Finds all data points in the database that are within a specified radius of a given latitude and longitude 
*
* @method findPointsRadius
* @param {Number} latitude Latitude to search for points around
* @param {Number} longitude Longitude to search for points around
* @param {Number} radius Size of radius to search around point. KM units.
* @return {Pormise} Returns a promise that will resolve with the results of the query
*/

var findPointsRadius = function(latitude, longitude, radius) {
  var queryPoint = `ST_GeomFromText('POINT(${latitude} ${longitude})')`;
  return GIS.select('*').from('locations').whereRaw(`ST_DWithin(geo, ${queryPoint}, ${radius})`);
}

module.exports = findPointsRadius;