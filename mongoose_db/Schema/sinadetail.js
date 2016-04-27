var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var ObjectId = mongoose.Schema.Types.ObjectId;
var ObjectId =mongoose.Schema.Types.ObjectId;


var SinadetailSchema = new Schema({
  maintitle:String,
  newsId:{
  	type: ObjectId,
    ref: 'SinaModel'
  },
  title: [],
  msg: [],
  src: [],
  createTime:{
  		type:Date,
  		default:Date.now()
  	}
})


module.exports = SinadetailSchema