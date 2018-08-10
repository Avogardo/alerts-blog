import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { Button } from '@material-ui/core';
import LoginWithGoogleButton from '../../imports/components/SignIn/LoginButtons/LoginWithGoogleButton/LoginWithGoogleButton.jsx';

describe('Login with Google button', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      classes: {
        button: '',
        rightIcon: '',
      },
      onGoogleLogin: () => {},
    };

    testRenderer = TestRenderer.create(<LoginWithGoogleButton {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginWithGoogleButton {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always renders a Button element', () => {
    expect(testInstance.findByType(Button)).toBeDefined();
  });
});
