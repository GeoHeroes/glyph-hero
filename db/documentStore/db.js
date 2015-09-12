var mongo = require('mongod');

var db = mongo('mongodb://localhost:27017/glyph-data', ['glyphData']);

module.exports = db;