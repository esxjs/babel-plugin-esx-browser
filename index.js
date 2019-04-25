'use strict'
const babylon = require('babylon')
const parse = require('esx/lib/parse')
const { marker } = require('esx/lib/symbols')
const components =  new Proxy({}, {
  has(t, p) { return p[0].toUpperCase() === p[0] },
  get(t, p) { 
    const o = {[p]: () =>{}}
    return o[p]
  }
})
function converter ({ pragma }) {
  const rx = RegExp(`^${pragma.replace(/\./, '\\.')}\\(|^"`)
  const convert = (strings, expressions) => {
    const state = parse(components, strings, expressions)
    const { tree } = state
    var i = tree.length
    const map = {}
    while (i--) {
      const [tag, props, childMap, meta] = tree[i]
      const children = new Array(childMap.length)
      const { dynAttrs, dynChildren, spread } = meta
      const spreads = spread && Object.keys(spread).map(Number)
      for (var c in childMap) {
        if (typeof childMap[c] === 'number') {
          children[c] = map[childMap[c]]
        } else {
          children[c] = childMap[c] || null
        }
      }
      if (spread) {
        for (var sp in spread)  { 
          const keys = Object.keys(expressions[sp])
          for (var k in keys) {
            if (spread[sp].after.indexOf(keys[k]) > -1) continue
            props[keys[k]] = expressions[sp][keys[k]]
          }
        }
      }
      if (dynAttrs) {
        for (var p in dynAttrs) {
          const overridden = spread && spreads.filter((n => {
            return dynAttrs[p] < n
          })).some((n) => {
            return p in expressions[n] && spread[n].before.indexOf(p) > -1
          })
          if (overridden) continue
          if (props[p] !== marker) continue // this means later static property, should override
          props[p] = expressions[dynAttrs[p]]
        }
      }
      if (dynChildren) {
        for (var n in dynChildren) {
          children[n] = expressions[dynChildren[n]]
        }
      }
      const reactChildren = children.length === 0 ? (props.children || null) : (children.length === 1 ? children[0] : children)
      if (reactChildren === null) {
        map[i] = `${pragma}(${tag.name || `'${tag}'`}, ${serialize(props)})`
      } else {
        map[i] = `${pragma}(${tag.name || `'${tag}'`}, ${serialize(props)}, ${serialize(reactChildren)})`
      }
    }
    return map[0]
  }

  function serialize (o) {
    if (Array.isArray(o)) return '[' + o.map((o) => serialize(o)).join(', ') + ']'
    if (typeof o === 'string') return rx.test(o) ? o : JSON.stringify(o)
    if (typeof o === 'object') {
      if ('start' in o) return source(o)
      var str = ''
      for (const k in o) str += serialize(o[k]) + ','
      str = '{' + str.slice(0, -1) + '}'
      return str
    }
  }

  function source (node) {
    const { start, end } = node
    return convert.code.slice(start, end)
  }
  return convert
}

function required (mod, path) {
  const { node } = path
  const { name } = node.callee
  if (name !== 'require') return false
  const [ arg ] = node.arguments
  return (arg.value === mod) 
}

function transform(_, options = {}) {
  const { 
    framework = 'React',
    include = 'import'
  } = options

  const pragma = framework === 'React' ? 'React.createElement' : false
  if (pragma === false) {
    throw Error('React is currently the only supported framework')
  }
  if (include !== 'import' && include !== 'require') {
    throw Error('Include option must be either import or require')
  }
  const convert = converter({ pragma })
  const load = include === 'import' ? 
    `import React from 'react'` :
    `const React = require('react')`
  var reactIncluded = false
	return {
		name: 'esx',
		visitor: {
      Program: {
        exit ({node}) {
          if (reactIncluded) return
          const [ inject ] = babylon.parse(load, {
            allowImportExportEverywhere: true
          }).program.body
          const { body } = node
          body.unshift(inject)
        }
      },
      CallExpression (path) {
        if (required('react', path) && path.parentPath.node.id) {
          if (path.parentPath.node.id.name === 'React') {
            reactIncluded = true
          }
        }
        if (required('esx', path)) {
          path.parentPath.parentPath.remove()
        }
      },
      ImportDeclaration (path) {
        path.get('specifiers')
          .filter(({node}) => node.type === 'ImportDefaultSpecifier')
          .forEach(({parent}) => {
            const { source } = parent
            const { local } = parent.specifiers
              .find(({type}) => type === 'ImportDefaultSpecifier')
            if (local.name === 'React' && source.value == 'react') {
              reactIncluded = true
            }
          })
      },
      MemberExpression (path) {
        const { node } = path
        const { object, property } = node
        if (property.name === 'register' && object.name === 'esx') {
          path.parentPath.remove()
        }
      },
			TaggedTemplateExpression (path, { file }) {
        const { quasi } = path.node
        const { quasis, expressions } = quasi
        const strings = quasis.map(({value}) => value.cooked)
        const { code } = file
        convert.code = code
        const converted = convert(strings, expressions)
        path.replaceWithSourceString(converted)
      }
    }
	}
}

module.exports = transform
