var mongoose = require('mongoose');
var activeSchema = require('../Schema/active.js')
var activeModel = mongoose.model('active',activeSchema);



module.exports = activeModel