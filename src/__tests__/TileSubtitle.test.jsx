import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import TileSubtitle from '../../imports/components/NewsContainer/TileSubtitle';

describe('TileSubtitle', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      index: 0,
      createdAt: new Date(),
    };

    testRenderer = TestRenderer.create(<TileSubtitle {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TileSubtitle {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
