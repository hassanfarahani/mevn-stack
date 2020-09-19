require("core-js/modules/es.string.trim");

require("core-js/modules/es.string.trim");

var _classCallCheck = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/classCallCheck");

var _createClass = require("D:/FullStackApp/mevn-stack/node_modules/@babel/runtime/helpers/createClass");

var StringUtil = /*#__PURE__*/function () {
  "use strict";

  function StringUtil() {
    _classCallCheck(this, StringUtil);
  }

  _createClass(StringUtil, null, [{
    key: "isEmpty",
    value: function isEmpty(value) {
      return !value || !value.trim();
    }
  }, {
    key: "capitalize",
    value: function capitalize(word) {
      return word.charAt(0).toUpperCase();
    }
  }]);

  return StringUtil;
}();

module.exports = StringUtil;