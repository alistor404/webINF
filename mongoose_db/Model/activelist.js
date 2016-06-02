var mongoose = require('mongoose');
var activelistSchema = require('../Schema/activelist.js')
var activelistModel = mongoose.model('activelist',activelistSchema);



module.exports = activelistModel