var mongoose = require('mongoose');
var SinadetailSchema = require('../Schema/sinadetail.js')
var SinadetailModel = mongoose.model('Sinadetail',SinadetailSchema);



module.exports = SinadetailModel