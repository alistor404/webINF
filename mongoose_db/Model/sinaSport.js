var mongoose = require('mongoose');
var SinaSchema = require('../Schema/sinaSport.js')
var SinaModel = mongoose.model('Sina',SinaSchema);



module.exports = SinaModel