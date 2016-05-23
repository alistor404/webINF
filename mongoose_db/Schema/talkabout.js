var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Mixed =mongoose.Schema.Types.Mixed;
var User=require("../Model/user.js")
var Statuslist=require("../Model/friendstatuslist.js")

var TalkaboutSchema = new Schema({
  content:[Mixed],
  username:String
})

//每次发表状态在粉丝的动态消息中添加消息
TalkaboutSchema.pre('save', function(next) {
	var thisTalk=this;
	User.findOne({username:thisTalk.username},function(err,user){
		for(var i in user.fans){
			Statuslist.findOne({username:user.fans[i]},function(err,statuslist){
				var t=1;
				if(statuslist.content.length==0){
					var statusdetail={
						username:thisTalk.username,
						content:thisTalk.content[thisTalk.content.length-1]
					};
					statuslist.content.push(statusdetail);
				}else{
					for(var n in statuslist.content){
						if(parseInt(statuslist.content[n].content.statusID)==parseInt(thisTalk.content[thisTalk.content.length-1].statusID)){
							break;
						};
						if(t==statuslist.content.length){
							var statusdetail={
								username:thisTalk.username,
								content:thisTalk.content[thisTalk.content.length-1]
							};
							statuslist.content.push(statusdetail);
							break;
						}
						t++;
					}
				};
				statuslist.markModified('content');
				statuslist.save(function(){
					next();
				});
			})
		}
	})
})

module.exports = TalkaboutSchema