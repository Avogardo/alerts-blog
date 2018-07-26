import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { Card, CardHeader } from '@material-ui/core';
import ExitNews from '../../imports/components/NewsContainer/ExitNews';

describe('ExitNews', () => {
  let props;
  let testRenderer;
  let testInstance;

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
      classes: {
        asideNewsCard: '',
        asideNewsHeaderCard: '',
      },
    };

    testRenderer = TestRenderer.create(<ExitNews {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExitNews {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always render as much Cards as news elements', () => {
    expect(testInstance.findAllByType(Card).length).toBe(props.topNews.length);
  });

  it('always render an image element', () => {
    expect(testInstance.findByProps({className: 'aside-news-image'})).toBeDefined();
  });

  it('always render a CardHeader element', () => {
    expect(testInstance.findByType(CardHeader)).toBeDefined();
  });

  it('card header element contains news h6 header', () => {
    expect(testInstance.findByType(CardHeader).props.title.type).toBe('h6');
  });
});
