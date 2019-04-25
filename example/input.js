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