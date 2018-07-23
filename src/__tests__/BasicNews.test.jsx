import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import BasicNews from '../../imports/components/NewsContainer/BasicNews';

describe('BasicNews', () => {
  let props;
  let testInstance;

  beforeEach(() => {
    props = {
      unit8ArrayToUrl: () => {},
      classes: {
        newsCardHeader: '',
        newsCardContent: '',
        tileCard: '',
      },
    };

    const renderer = new ShallowRenderer();
    renderer.render(<BasicNews {...props} />);
    testInstance = renderer.getRenderOutput();
  });

  describe('There are news', () => {
    beforeEach(() => {
      props = {
        unit8ArrayToUrl: () => {},
        topNews: [{
          _id: '',
          authorId: '',
          title: 'title',
          content: '',
          createdAt: new Date(),
          tags: [],
          enterImage: {
            data: {
              name: '',
              image: new Uint8Array(),
            },
          },
        }],
        authors: [''],
        classes: {
          newsCardHeader: '',
          newsCardContent: '',
          tileCard: '',
        },
      };

      const renderer = new ShallowRenderer();
      renderer.render(<BasicNews {...props} />);
      testInstance = renderer.getRenderOutput();
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BasicNews {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe('There are no news', () => {
    beforeEach(() => {
      props = {
        unit8ArrayToUrl: () => {},
        classes: {
          newsCardHeader: '',
          newsCardContent: '',
          tileCard: '',
        },
      };

      const renderer = new ShallowRenderer();
      renderer.render(<BasicNews {...props} />);
      testInstance = renderer.getRenderOutput();
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BasicNews {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
