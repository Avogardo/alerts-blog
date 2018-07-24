import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { Card, GridList, GridListTile } from '@material-ui/core';
import BasicNews from '../../imports/components/NewsContainer/BasicNews';

describe('BasicNews', () => {
  let props;
  let testRenderer;
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

    testRenderer = TestRenderer.create(<BasicNews {...props} />);
    testInstance = testRenderer.root;
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

      testRenderer = TestRenderer.create(<BasicNews {...props} />);
      testInstance = testRenderer.root;
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BasicNews {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('always render as much Cards as news elements', () => {
      expect(testInstance.findAllByType(Card).length).toBe(props.topNews.length);
    });

    it('always render a GridList element', () => {
      expect(testInstance.findByType(GridList)).toBeDefined()
    });

    it('always render a GridListTile element', () => {
      expect(testInstance.findByType(GridListTile)).toBeDefined()
    });

    it('always render an image element', () => {
      expect(testInstance.findByProps({className: 'enter-news-image'})).toBeDefined();
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

      testRenderer = TestRenderer.create(<BasicNews {...props} />);
      testInstance = testRenderer.root;
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BasicNews {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
