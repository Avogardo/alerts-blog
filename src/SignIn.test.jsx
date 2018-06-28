import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';

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
    expect(testInstance.findAllByType('h2')).toHaveLength(1);
  });
});
