import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import NewsContainer from '../imports/components/NewsContainer/NewsContainer.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <NewsContainer />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
