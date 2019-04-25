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

