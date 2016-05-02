var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var UserSchema = new Schema({
  username: String,
  password: String,
  phonenum: String,
  brithday:{
    type:String,
    default:''
  },
  nicename: {
      type:String,
      default:this.username
  },
  sexy: {
      type:Boolean,
      default:true
  },
  sign:{
      type:String,
      default:''
  },
  visible:{
      type:Boolean,
      default:true
  },
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
UserSchema.pre('save', function(next) {
  if(!this.nicename){
    this.nicename=this.username
  }
  next();
})

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