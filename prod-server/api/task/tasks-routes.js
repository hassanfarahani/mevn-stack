"use strict";

var _interopRequireWildcard = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var controller = _interopRequireWildcard(require("./tasks-controller"));

var auth = _interopRequireWildcard(require("../../services/auth-service"));

var router = _express.default.Router();

router.post('/task', auth.requireLogin, controller.create);
router.get('/task', auth.requireLogin, controller.index);
router.get('/task/:id', auth.requireLogin, controller.show);
router.put('/task', auth.requireLogin, controller.update);
router.delete('/task/:id', auth.requireLogin, controller.remove);
var _default = router; // middleware: auth.requireLogin
// every time a user tries to access any of these end points, it'll run this
// middleware, check for the token and make sure that users logged in and if they are, it'll return it.

exports.default = _default;