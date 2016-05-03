var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Mixed =mongoose.Schema.Types.Mixed;


var TalkaboutSchema = new Schema({
  content:[Mixed],
  username:String
})


module.exports = TalkaboutSchema