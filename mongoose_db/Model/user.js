var mongoose = require('mongoose');
var UserSchema = require('../Schema/user.js')
var UserModel = mongoose.model('User',UserSchema);



module.exports = UserModel