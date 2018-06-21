import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import Sidebar from '../imports/components/Sidebar';

let props = {};
const styles = {
  list: 'width: 250',
};

beforeEach(() => {
  props = {
    classes: styles,
    isSidebarOpen: false,
    setSidebarState: () => {},
  };
});

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Sidebar {...props} />,
    div,
  );

  ReactDOM.unmountComponentAtNode(div);
});
