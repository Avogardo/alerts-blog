import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import {
  Card,
  GridList,
  GridListTile,
  CardHeader,
} from '@material-ui/core';
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
        authors: ['Jakub'],
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
      expect(testInstance.findByType(GridList)).toBeDefined();
    });

    it('always render a GridListTile element', () => {
      expect(testInstance.findByType(GridListTile)).toBeDefined();
    });

    it('always render an image element', () => {
      expect(testInstance.findByProps({className: 'enter-news-image'})).toBeDefined();
    });

    it('always render a CardHeader element', () => {
      expect(testInstance.findByType(CardHeader)).toBeDefined();
    });

    it('card header element contains news h4 header', () => {
      expect(testInstance.findByType(CardHeader).props.title.type).toBe('h4');
    });

    it('card header element subtitle contain authors from props', () => {
      expect(testInstance.findByType(CardHeader).props.subheader.props.authors)
        .toEqual(props.authors);
    });

    it('card header element subtitle contain createdAt prop from props', () => {
      expect(testInstance.findByType(CardHeader).props.subheader.props.createdAt)
        .toBe(props.topNews[0].createdAt);
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
