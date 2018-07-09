import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import CreateNews from '../imports/components/CreateNews/CreateNews.jsx';

describe("Create news", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <CreateNews />,
      div,
    );

    ReactDOM.unmountComponentAtNode(div);
  });
});
