var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Mixed =mongoose.Schema.Types.Mixed;

var StatuslistSchema = new Schema({
  content:[Mixed],
  username:String
})

// // var ObjectId = mongoose.Schema.Types.ObjectId

module.exports = StatuslistSchema