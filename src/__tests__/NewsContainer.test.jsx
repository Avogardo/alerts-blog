import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import NewsContainer from '../../imports/components/NewsContainer/NewsContainer.jsx';

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
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<NewsContainer {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
