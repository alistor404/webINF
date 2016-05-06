var mongoose = require('mongoose');
var StatuslistSchema = require('../Schema/friendstatuslist.js')
var statuslistModel = mongoose.model('Statuslist',StatuslistSchema);



module.exports = statuslistModel