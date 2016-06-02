var mongoose = require('mongoose')
var myactive=require("../Model/myactive.js")
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var Mixed =mongoose.Schema.Types.Mixed;

var ActiveSchema = new Schema({
  username: String,
  title:String,
  taps: [String],
  text: String,
  activeTime:String,
  localtion:String,
  join: [String],
  money:String,
  comment:[Mixed],
  pic:[String],
  zan:[String],
	createTime:{
		type:Date,
		default:Date.now()
	}
})

ActiveSchema.pre('save', function(next) {
  var thisobj=this;
  myactive.findOne({username:thisobj.username},function(err,myactives){
    if(!myactives){
      var myact= new myactive({
        username:thisobj.username,
        mylist:[thisobj._id]
      })
      myact.save()
    }else{
      for(var i in myactives.mylist){
        if(myactives.mylist[i]==thisobj._id){
          next();
          continue;
        }else if(i==myactives.mylist.length-1){
          myactives.mylist.push(thisobj._id)
          myactives.save()
        }
      }
    }
  })
  next();
})

module.exports = ActiveSchema