import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';

import Button from '@material-ui/core/Button';
import SignIn from '../imports/components/SignIn';

describe("SignIn", () => {
  let testRenderer, testInstance;

  beforeEach(() => {
    testRenderer = TestRenderer.create(<SignIn />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignIn />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always renders a h2 header', () => {
    expect(testInstance.findByType('h2')).toBeDefined();
  });

  it('always renders a google plus button', () => {
    expect(testInstance.findByType(Button)).toBeDefined();
  });
});
