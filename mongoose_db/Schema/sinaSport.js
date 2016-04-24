var mongoose = require('mongoose')
var sinadetail=require("../../crawler/sinadetail.js")
var Schema = mongoose.Schema


var SinaSchema = new Schema({
  title: String,
  href: String,
  src: String,
  createTime:{
  		type:Date,
  		default:Date.now()
  	}
})

// // var ObjectId = mongoose.Schema.Types.ObjectId
SinaSchema.pre('save', function(next) {
	sinadetail.sinadetail(this.href)
  	next()
})

module.exports = SinaSchema