"use strict";

var _interopRequireDefault = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJWT = generateJWT;
exports.requireLogin = requireLogin;
exports.decodeToken = decodeToken;
exports.getUsername = getUsername;
exports.getUserId = getUserId;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function generateJWT(user) {
  var tokendata = {
    username: user.username,
    id: user._id
  }; // every token you create is going to be signed with this secret. And so you'll need this secret in order to decrypt that token.

  return _jsonwebtoken.default.sign({
    user: tokendata
  }, process.env.TOKEN_SECRET);
} // this will basically be attached to any routes that we want the user to be logged in for in order to access


function requireLogin(req, res, next) {
  var token = decodeToken(req);

  if (!token) {
    return res.status(401).json({
      message: 'You must be logged in!'
    });
  }

  next();
} // a method to access the session.
// create a method that can decode the token.


function decodeToken(req) {
  var token = req.headers.authorization || req.headers['authorization'];

  if (!token) {
    return null;
  }

  try {
    return _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}

function getUsername(req) {
  var token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.username;
}

function getUserId(req) {
  var token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.id;
}