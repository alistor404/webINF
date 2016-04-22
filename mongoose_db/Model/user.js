var mongoose = require('mongoose');
var UserSchema = require('../schema/user.js')
var UserModel = mongoose.model('User',UserSchema);



module.exports = UserModel