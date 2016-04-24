var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SinadetailSchema = new Schema({
  maintitle:String,
  title: [],
  msg: [],
  src: [],
  createUser:{
  		type:Date,
  		default:Date.now()
  	}
})


module.exports = SinadetailSchema