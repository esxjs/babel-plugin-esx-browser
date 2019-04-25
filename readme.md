# babel-plugin-esx-browser

Babel plugin to prepare ESX for production-ready browser code.

## Status

Stable.

## Example

**In**

```js
const esx = require('esx')()
const data = { value: 'hi' }

const Component = ({ value }) => esx`
  <div>
    <p> some content </p>
    <p> some ${value} </p>
  </div>
`

esx.register({ Component })

const App = () => esx`<Component ...${data}/>`

export default App
```

**Out**

```js
import React from 'react';
const data = {
  value: 'hi'
};

const Component = ({
  value
}) => React.createElement('div', {}, [React.createElement('p', {}, " some content "), React.createElement('p', {}, [" some ", value])]);

const App = () => React.createElement(Component, data);

export default App;
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
