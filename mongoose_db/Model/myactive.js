var mongoose = require('mongoose');
var myactiveSchema = require('../Schema/myactive.js')
var myactiveModel = mongoose.model('myactive',myactiveSchema);



module.exports = myactiveModel