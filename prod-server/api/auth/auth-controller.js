"use strict";

var _interopRequireDefault = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _userModel = _interopRequireDefault(require("../../model/user-model"));

var _authService = require("../../services/auth-service");

// import { StringUtil } from '../../utilities/string-util'
var StringUtil = require('../../utilities/string-util');

function index(req, res) {
  var validation = validateIndex(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: validation.message
    });
  }

  _userModel.default.findOne({
    username: req.body.username.toLowerCase()
  }, function (error, user) {
    if (error) {
      return res.status(500).json();
    }

    if (!user) {
      return res.status(401).json();
    }

    var passwordsMatch = _userModel.default.passwordMatches(req.body.password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json();
    }

    var token = (0, _authService.generateJWT)(user);
    return res.status(200).json({
      token: token
    });
  });
}

function validateIndex(body) {
  var errors = '';

  if (StringUtil.isEmpty(body.username)) {
    errors += 'Username is required. ';
  }

  if (StringUtil.isEmpty(body.password)) {
    errors += 'Password is required. ';
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  };
}

module.exports = index;