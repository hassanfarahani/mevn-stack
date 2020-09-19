"use strict";

var _interopRequireDefault = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _userModel = _interopRequireDefault(require("../../model/user-model"));

// import { StringUtil } from '../../utilities/string-util'
var StringUtil = require('../../utilities/string-util');

function index(req, res) {
  var validation = validateIndex(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: validation.message
    });
  }

  var user = new _userModel.default({
    username: req.body.username,
    password: req.body.password,
    first: req.body.first,
    last: req.body.last
  }); // check to see if the error code matches 11000, So in Mongoose, 11000 validation error basically means that the user name was taken

  user.save(function (error) {
    if (error) {
      if (error.code === 11000) {
        return res.status(403).json({
          message: 'Username is already taken!'
        });
      }

      console.log('error:', error);
      return res.status(500).json();
    }

    return res.status(201).json();
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

  if (StringUtil.isEmpty(body.first)) {
    errors += 'First name is required. ';
  }

  if (StringUtil.isEmpty(body.last)) {
    errors += 'Last name is required. ';
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  };
}

module.exports = index;