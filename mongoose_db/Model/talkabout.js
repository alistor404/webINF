var mongoose = require('mongoose');
var TalkaboutSchema = require('../Schema/talkabout.js')
var TalkaboutModel = mongoose.model('Talkabout',TalkaboutSchema);



module.exports = TalkaboutModel