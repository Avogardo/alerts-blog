import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import Sidebar from '../imports/components/Sidebar';

let props = {};
const div = document.createElement('div');
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

afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  ReactDOM.render(
    <Sidebar {...props} />,
    div,
  );
});
