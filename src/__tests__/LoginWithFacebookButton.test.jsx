import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { Button } from '@material-ui/core';
import LoginWithFacebookButton from '../../imports/components/SignIn/LoginButtons/LoginWithFacebookButton/LoginWithFacebookButton.jsx';

describe('Login with Facebook button', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      classes: {
        button: '',
        rightIcon: '',
      },
      onFacebookLogin: () => {},
    };

    testRenderer = TestRenderer.create(<LoginWithFacebookButton {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginWithFacebookButton {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always renders a Button element', () => {
    expect(testInstance.findByType(Button)).toBeDefined();
  });
});
