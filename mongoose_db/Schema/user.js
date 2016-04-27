var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var UserSchema = new Schema({
  username: String,
  password: String,
  phonenum: String,
  sexy: Boolean,
  hot: Number,
  meta:{
  	createUser:{
  		type:Date,
  		default:Date.now()
  	},
  	lastLogin:{
  		type:Date,
  		default:Date.now
  	}
  }
})

// // var ObjectId = mongoose.Schema.Types.ObjectId
// UserSchema.pre('save', function(next) {

//   next()
// })

// UserSchema.statics = {
//   fetch: function(cb) {
//     return this
//       .find({})
//       .sort('meta.lastLogin')
//       .exec(cb)
//   },
//   findById: function(usname, cb) {
//     return this
//       .findOne({username: usname})
//       .exec(cb)
//   }
// }

module.exports = UserSchema