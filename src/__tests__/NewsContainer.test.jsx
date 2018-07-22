import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { Card } from '@material-ui/core';
import NewsContainer from '../../imports/components/NewsContainer/NewsContainer.jsx';
import EnterNews from '../../imports/components/NewsContainer/EnterNews';

describe('NewsContainer', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      unit8ArrayToUrl: () => {},
      classes: {
        mainNewsCard: '',
        newsCard: '',
      },
    };

    testRenderer = TestRenderer.create(<NewsContainer {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewsContainer {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('Enter container', () => {
    beforeEach(() => {
      props = {
        unit8ArrayToUrl: () => {},
        enterContainer: true,
        classes: {
          mainNewsCard: '',
          newsCard: '',
        },
      };

      testRenderer = TestRenderer.create(<NewsContainer {...props} />);
      testInstance = testRenderer.root;
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<NewsContainer {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('always render a section element', () => {
      expect(testInstance.findByType('section')).toBeDefined();
    });

    it('always render a card element', () => {
      expect(testInstance.findByType(Card)).toBeDefined();
    });

    it('always render a EnterNews element', () => {
      expect(testInstance.findByType(EnterNews)).toBeDefined();
    });
  });
});
