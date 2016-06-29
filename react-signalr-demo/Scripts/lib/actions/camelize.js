"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = camelize;

var _camelcaseKeys = require("camelcase-keys");

var _camelcaseKeys2 = _interopRequireDefault(_camelcaseKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function camelize(json) {
    for (var k in json) {
        if (_typeof(json[k]) == "object" && json[k] !== null) json[k] = camelize(json[k]);
    }
    return (0, _camelcaseKeys2.default)(json);
};