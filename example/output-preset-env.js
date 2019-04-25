"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var data = {
  value: 'hi'
};

var Component = function Component(_ref) {
  var value = _ref.value,
      prop = _ref.prop,
      title = _ref.title;
  return _react["default"].createElement('div', null, [_react["default"].createElement('p', null, [" some content: ", title]), _react["default"].createElement('p', null, [" some ", value]), _react["default"].createElement('p', null, [" some ", prop, " prop "])]);
};

var App = function App(_ref2) {
  var title = _ref2.title;
  return _react["default"].createElement(Component, _objectSpread({
    prop: "static"
  }, data, {
    title: title
  }));
};

var _default = App;
exports["default"] = _default;

