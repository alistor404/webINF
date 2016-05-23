var mongoose = require('mongoose')
var Statuslist=require("../Model/friendstatuslist.js")//创建用户时添加用户statuslist
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
  headerpic:{
    type:String,
    default:'icon/headerpic.jpg'
  },
  concems:[String],
  fans:[String],
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
    this.nicename=this.username;
    this.concems.push(this.username);
    this.fans.push(this.username);
    this.headerpic='icon/headerpic.jpg';
    var statuslist=new Statuslist({
      username:this.username,
      content:[]
    })
    statuslist.save(function(){
      next();
    });
  };
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