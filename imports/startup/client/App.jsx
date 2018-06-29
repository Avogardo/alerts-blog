import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import MainLayout from '/imports/components/MainLayout';
import NewsContainer from '/imports/components/NewsContainer';
import SignIn from '/imports/components/SignIn';

const App = () => (
  <Router>
    <div className="container">
      <Route path="/" component={MainLayout} />
      <Route exact path="/" component={NewsContainer} />
      <Route exact path="/sign-in" component={SignIn} />
    </div>
  </Router>
);

Meteor.startup(() => {
  render(
    <App />,
    document.getElementById('app'),
  );
});
