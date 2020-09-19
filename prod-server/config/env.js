"use strict";

var _interopRequireDefault = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEnvironment = setEnvironment;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function setEnvironment(app) {
  console.log('env var:', process.env.NODE_ENV); // if (process.env.NODE_ENV !== 'production') {
  //     setDevEnv(app)
  // } else {

  setProdEnv(app); // }
}

function setDevEnv(app) {
  process.env.NODE_ENV = 'development';
  process.env.DB_URL = 'mongodb://localhost:27017/vue-db';
  process.env.TOKEN_SECRET = 'my-development-secret';
  app.use(_bodyParser.default.json());
  app.use((0, _morgan.default)('dev'));
  app.use((0, _cors.default)());
}

function setProdEnv(app) {
  process.env.DB_URL = 'mongodb+srv://user:Newgalaxy@cluster0.m4sjn.mongodb.net/Cluster0?retryWrites=true&w=majority';
  process.env.TOKEN_SECRET = 'my-production-secret';
  app.use(_bodyParser.default.json());
  app.use(_express.default.static("".concat(__dirname, "/../../dist"))); //it'll take our build folder(dist), & it'll serve it as static content
}