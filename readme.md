# babel-plugin-esx-browser

Babel plugin to prepare ESX for production-ready browser code.

## Status

Experimental.

## Example

**In**

```js
const esx = require('esx')()
const data = { value: 'hi' }
const Component = ({ value, prop, title }) => esx`
  <div>
    <p> some content: ${title} </p>
    <p> some ${value} </p>
    <p> some ${prop} prop </p>
  </div>
`

esx.register({ Component })

const App = ({ title }) => {
  return esx`<Component prop="static" ...${data} title=${title}/>`
}

export default App
```

**Out**

```js
import React from 'react';
const data = {
  value: 'hi'
};

const Component = ({
  value,
  prop,
  title
}) => React.createElement('div', null, [React.createElement('p', null, [" some content: ", title]), React.createElement('p', null, [" some ", value]), React.createElement('p', null, [" some ", prop, " prop "])]);

const App = ({
  title
}) => {
  return React.createElement(Component, {
    prop: "static",
    ...data,
    title: title
  });
};

export default App;
```

**Out when configured with @babel/preset-env**

```js
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
```

## Installation

```sh
$ npm install babel-plugin-esx-ssr
```

## Usage

**.babelrc**

```json
{
  "plugins": ["esx-ssr", {
     "framework": "React",
     "include": "import"
  }]
}
```

## Options

### `framework` (default: `React`)

Currently the only available option is `React`.

When set to `React` all elements are created
with `React.createElement` and if React has not
been included into a script, it will be added 
with either `import` or `require` as per the `include`
option.

### `include` (default: `import`)

May be either `import` or `require`. If the framework
hasn't been added to a script, it will included 
with the module syntax specified.

## Requirements

This plugin is for `esx` v2.x.x.

## Contributions

`esx` is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [CONTRIBUTING.md](https://github.com/esxjs/esx/blob/master/CONTRIBUTING.md) file for more details.



## Licence

MIT
