import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import NewsContainer from '../imports/components/NewsContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const newsArray = [1, 2, 3];

  ReactDOM.render(
    <NewsContainer newsArray={newsArray} />,
    div,
  );

  ReactDOM.unmountComponentAtNode(div);
});
