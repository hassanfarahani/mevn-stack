"use strict";

var _interopRequireDefault = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

// import * as controller from './register-controller'
var index = require('./register-controller');

var router = _express.default.Router();

router.post('/register', index);
var _default = router;
exports.default = _default;