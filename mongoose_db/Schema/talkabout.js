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
				var statusdetail={
					username:thisTalk.username,
					content:thisTalk.content[thisTalk.content.length-1]
				};
				if(!statuslist){
					var fansstatuslist=new Statuslist({
						username:user.fans[i],
						content:[]
					})
					fansstatuslist.content.push(statusdetail);
					fansstatuslist.save(function(){
						next();
					});
				}else{
					statuslist.content.push(statusdetail);
					statuslist.save(function(){
						next();
					});
				}
			})
		}
	})
})

module.exports = TalkaboutSchema