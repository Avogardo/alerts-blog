import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { Card } from '@material-ui/core';
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
});
