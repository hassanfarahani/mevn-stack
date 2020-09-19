"use strict";

var _interopRequireDefault = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _stringUtil = require("../utilities/string-util");

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _this = void 0;

var userSchema = new _mongoose.default.Schema({
  username: String,
  first: String,
  last: String,
  password: String
});
userSchema.set('timestamps', true);
userSchema.virtual('fullName').get(function () {
  var first = _stringUtil.StringUtil.capitalize(_this.first.toLowerCase());

  var last = _stringUtil.StringUtil.capitalize(_this.last.toLowerCase());

  return "".concat(first, " ").concat(last);
}); // statics: methods that you want to use in your user schema and you can use it anywhere throughout your application.

userSchema.statics.passwordMatches = function (password, hash) {
  // password: user provide, hash: the encrypted one
  return _bcryptNodejs.default.compareSync(password, hash); // it will compare the password from the user to the one in the database and return whether or not it's actually valid.
}; // presave method: this will run before you ever save a user into the database


userSchema.pre('save', function (next) {
  this.username = this.username.toLowerCase();
  this.first = this.first.toLowerCase();
  this.last = this.last.toLowerCase();
  var unsafePassword = this.password;
  this.password = _bcryptNodejs.default.hashSync(unsafePassword); // this will return a hash password (an encrypted password)

  next();
});

var _default = _mongoose.default.model('user', userSchema);

exports.default = _default;