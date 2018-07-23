import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import {
  Card,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import EnterNews from '../../imports/components/NewsContainer/EnterNews';
import TileSubtitle from '../../imports/components/NewsContainer/TileSubtitle';

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

  it('always render breaking news card', () => {
    expect(testInstance.findByType(Card)).toBeDefined();
  });

  it('always render breaking news strong title', () => {
    expect(testInstance.findByType(Card).findByType('strong')).toBeDefined();
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

    it('always render a gridlist element', () => {
      expect(testInstance.findByType(GridList)).toBeDefined();
    });

    it('always render as much GridListTiles as news element', () => {
      expect(testInstance.findAllByType(GridListTile).length).toBe(props.topNews.length);
    });

    it('always render a image element', () => {
      expect(testInstance.findByProps({className: 'enter-news-image'})).toBeDefined();
    });

    it('always render a GridListTileBar element', () => {
      expect(testInstance.findByType(GridListTileBar)).toBeDefined();
    });

    it('always render a TileSubtitle element', () => {
      expect(testInstance.findByType(TileSubtitle)).toBeDefined();
    });

    it('GridListTileBar title is equal to news title', () => {
      expect(testInstance.findByType(GridListTileBar).props.title).toBe(props.topNews[0].title);
    });
  });

  describe('There are no news', () => {
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

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<EnterNews {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
