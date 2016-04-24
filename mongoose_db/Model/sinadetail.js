var mongoose = require('mongoose');
var SinadetailSchema = require('../Schema/Sinadetail.js')
var SinadetailModel = mongoose.model('Sinadetail',SinadetailSchema);



module.exports = SinadetailModel