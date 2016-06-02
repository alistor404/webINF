var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var MyactiveSchema = new Schema({
  username: String,
  mylist:[ObjectId]
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

module.exports = MyactiveSchema