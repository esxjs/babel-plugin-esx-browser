# babel-plugin-esx-browser

Babel plugin to convert ESX to 

## Status

Incomplete. 

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
import React from 'react'

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

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["esx-ssr", {
     "pragma": "React.createElement",
     "include": "import React from 'react'"
  }]
}
```

## Options

### `pragma` (default: `React.createElement`)

The function to use to create the DOM tree.

### `include` (default: `import React from 'react'`)

Includes additional module loading statement at the top
of any script/module that contains any ESX statements.

## Requirements

This plugin is for `esx` v2.x.x.

## Contributions

`esx` is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

See the [CONTRIBUTING.md](https://github.com/esxjs/esx/blob/master/CONTRIBUTING.md) file for more details.



## Licence

MIT
