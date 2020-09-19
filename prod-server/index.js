"use strict";

var _interopRequireDefault = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.concat");

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes");

var _env = require("./config/env.js");

var _db = require("./config/db.js");

var app = (0, _express.default)();
var port = process.env.PORT || 3000;
(0, _env.setEnvironment)(app);
(0, _db.connectToDB)();
(0, _routes.registerRoutes)(app);
app.get('/', function (req, res) {
  if (process.env.NODE_ENV !== 'production') {
    return res.send('Running server in development mode.');
  } else {
    return res.sendFile('index.html', {
      root: "".concat(__dirname, "/../dist/")
    });
  }
});
app.listen(port, function () {
  console.log("MEVN app listening on port ".concat(port, " ").concat(process.env.NODE_ENV, " mode!"));
});