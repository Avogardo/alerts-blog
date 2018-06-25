import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';

import AppBar from '@material-ui/core/AppBar';
import Navigation from '../imports/components/Navigation';

describe("Navigation", () => {
  let props;

  beforeEach(() => {
    props = {
      toggleSidebar: () => {},
    };
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navigation {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always renders a nav bar', () => {
    const testRenderer = TestRenderer.create(<Navigation {...props} />);
    const testInstance = testRenderer.root;

    expect(testInstance.findAllByType('nav').length).toBe(1);
  });

  it('always renders both app bars', () => {
    const testRenderer = TestRenderer.create(<Navigation {...props} />);
    const testInstance = testRenderer.root;

    expect(testInstance.findAllByType(AppBar).length).toBe(2);
  });
});
