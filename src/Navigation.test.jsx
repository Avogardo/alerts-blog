import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';

import {
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import Navigation from '../imports/components/Navigation';

describe("Navigation", () => {
  let props, testRenderer, testInstance;

  beforeEach(() => {
    props = {
      toggleSidebar: () => {},
      goToNewsContainer: () => {},
    };

    testRenderer = TestRenderer.create(<Navigation {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navigation {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always renders a nav bar', () => {
    expect(testInstance.findByType('nav')).toBeDefined();
  });

  it('always renders a h1 element', () => {
    expect(testInstance.findByType('h1')).toBeDefined();
  });

  it('always renders a img element', () => {
    expect(testInstance.findByType('img')).toBeDefined();
  });

  it('always renders both app bars', () => {
    expect(testInstance.findAllByType(AppBar)).toHaveLength(2);
  });

  it('always renders both app toolbars', () => {
    expect(testInstance.findAllByType(Toolbar)).toHaveLength(2);
  });

  it('always renders IconButton elements', () => {
    expect(testInstance.findAllByType(IconButton).length).toBeGreaterThan(0);
  });

  it('appbars position should be static', () => {
    const appBars = testInstance.findAllByType(AppBar);

    appBars.forEach(appBar => expect(appBar.props.position).toBe('static'));
  });

  it('IconButtons always have only one child', () => {
    const iconButtons = testInstance.findAllByType(IconButton);

    iconButtons.forEach(iconButton => expect(iconButton.children).toHaveLength(1));
  });
});
