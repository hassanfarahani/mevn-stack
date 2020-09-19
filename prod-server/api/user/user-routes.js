"use strict";

var _interopRequireWildcard = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var controller = _interopRequireWildcard(require("./user-controller"));

var router = _express.default.Router();

router.get('/user', controller.index);
var _default = router;
exports.default = _default;