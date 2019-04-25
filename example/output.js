import React from 'react';
const data = {
  value: 'hi'
};

const Component = ({
  value
}) => React.createElement('div', {}, [React.createElement('p', {}, " some content "), React.createElement('p', {}, [" some ", value])]);

const App = () => React.createElement(Component, data);

export default App;

