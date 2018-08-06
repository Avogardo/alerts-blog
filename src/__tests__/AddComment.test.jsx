import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import {
  Card,
  CardHeader,
  CardActions,
  Button,
  Input,
  Snackbar,
} from '@material-ui/core';
import AddComment from '../../imports/components/Comments/AddComment/AddComment.jsx';

describe('Add comment', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      classes: {
        addCommentCard: '',
        addCommentHeader: '',
        actionCard: '',
        input: '',
        inputMultiline: '',
        button: '',
        addCommentChildrenCard: '',
        addCommentChildrenHeader: '',
      },
      createComment: () => {},
      isLoggedIn: false,
    };

    testRenderer = TestRenderer.create(<AddComment {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddComment {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always renders a Card element', () => {
    expect(testInstance.findByType(Card)).toBeDefined();
  });

  it('always renders a CardHeader element', () => {
    expect(testInstance.findByType(CardHeader)).toBeDefined();
  });

  it('always renders a CardActions element', () => {
    expect(testInstance.findByType(CardActions)).toBeDefined();
  });

  it('renders 2 Input elements if not logged in', () => {
    expect(testInstance.findAllByType(Input)).toHaveLength(2);
  });

  it('always renders a Button element', () => {
    expect(testInstance.findByType(Button)).toBeDefined();
  });

  it('always renders a Snackbar element', () => {
    expect(testInstance.findByType(Snackbar)).toBeDefined();
  });

  describe('Is user logged in', () => {
    let props;
    let testRenderer;
    let testInstance;

    beforeEach(() => {
      props = {
        classes: {
          addCommentCard: '',
          addCommentHeader: '',
          actionCard: '',
          input: '',
          inputMultiline: '',
          button: '',
          addCommentChildrenCard: '',
          addCommentChildrenHeader: '',
        },
        createComment: () => {},
        isLoggedIn: true,
      };

      testRenderer = TestRenderer.create(<AddComment {...props} />);
      testInstance = testRenderer.root;
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<AddComment {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('renders an Input element if logged in', () => {
      expect(testInstance.findByType(Input)).toBeDefined();
    });
  });
});
