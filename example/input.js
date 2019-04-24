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