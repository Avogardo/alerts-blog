import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

const App = () => <h1>Hello world</h1>;

Meteor.startup(() => {
  render(
    <App />,
    document.querySelector('#app'),
  );
});
