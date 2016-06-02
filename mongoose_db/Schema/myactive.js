var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var MyactiveSchema = new Schema({
  username: String,
  mylist:[ObjectId]
})


module.exports = MyactiveSchema