const esx = require('esx')();

const data = {
  value: 'hi'
};

const Component = ({
  value
}) => React.createElement('div', {}, [React.createElement('p', {}, " some content "), React.createElement('p', {}, [" some ", value])]);

esx.register({
  Component
});

const App = () => React.createElement(Component, data);

export default App;

