import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import Navigation from '../imports/components/Navigation';

describe("Navigation", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navigation toggleSidebar={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
