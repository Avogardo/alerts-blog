import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import EnterNews from '../../imports/components/NewsContainer/EnterNews';

describe('EnterNews', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      unit8ArrayToUrl: () => {},
      classes: {
        gridListTileBar: '',
        breakingNews: '',
      },
    };

    testRenderer = TestRenderer.create(<EnterNews {...props} />);
    testInstance = testRenderer.root;
  });

  describe('There are news', () => {
    beforeEach(() => {
      props = {
        unit8ArrayToUrl: () => {},
        topNews: [{
          _id: '',
          authorId: '',
          title: '',
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
          gridListTileBar: '',
          breakingNews: '',
        },
      };

      testRenderer = TestRenderer.create(<EnterNews {...props} />);
      testInstance = testRenderer.root;
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<EnterNews {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
