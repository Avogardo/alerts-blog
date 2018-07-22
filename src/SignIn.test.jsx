import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';

import { Button, CardContent } from '@material-ui/core';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';

import SignIn from '../imports/components/SignIn/SignIn.jsx';

describe('SignIn', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      classes: {
        button: '',
        rightIcon: '',
        signIn: '',
      },
      errorMessage: '',
      onGoogleLogin: () => {},
    };

    testRenderer = TestRenderer.create(<SignIn {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignIn {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always renders a h2 header', () => {
    expect(testInstance.findByType('h2')).toBeDefined();
  });

  it('always renders a google plus button', () => {
    expect(testInstance.findByType(Button)).toBeDefined();
  });

  it('always renders a google plus icon', () => {
    expect(testInstance.findByType(GooglePlusIcon)).toBeDefined();
  });

  describe('SignIn has only one child - form', () => {
    it('always have only one child', () => {
      expect(testInstance.children[0].children).toHaveLength(1);
    });

    it('always have child form', () => {
      expect(testInstance.children[0].children[0].type).toBe('form');
    });
  });

  describe('Error message', () => {
    it('when errorMessage is empty there is no error message', () => {
      const isErrorCard = testInstance.findAllByType(CardContent).length;
      expect(isErrorCard).toBeFalsy();
    });

    it('when errorMessage is set, there is error message displayed', () => {
      props.errorMessage = 'An error occurred, please try again later';
      const testErrorRenderer = TestRenderer.create(<SignIn {...props} />);
      const testErrorInstance = testErrorRenderer.root;

      const isErrorCard = testErrorInstance.findByType(CardContent);
      expect(isErrorCard).toBeDefined();
    });

    it('when errorMessage is set, is displayed inside card content component', () => {
      props.errorMessage = 'An error occurred, please try again later';
      const testErrorRenderer = TestRenderer.create(<SignIn {...props} />);
      const testErrorInstance = testErrorRenderer.root;

      const isErrorCard = testErrorInstance.findByType(CardContent)
        .children[0]
        .children[0]
        .children.join('');
      expect(isErrorCard).toContain(props.errorMessage);
    });
  });
});
