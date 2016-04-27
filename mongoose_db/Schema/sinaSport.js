var mongoose = require('mongoose')
var Schema = mongoose.Schema
var sinadetail=require("../../crawler/sinadetail.js")

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
	sinadetail.sinadetail(this.href,this._id)
  	next()
})

module.exports = SinaSchema