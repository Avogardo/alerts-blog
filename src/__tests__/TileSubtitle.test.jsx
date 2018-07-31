import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { CalendarMultipleCheckIcon } from 'mdi-react';
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

  it('always render span wrapper', () => {
    expect(testInstance.findByProps({className: 'subtitle-tile'})).toBeDefined();
  });

  it('always render calendar wrappers', () => {
    expect(testInstance.findAllByProps({className: 'tile-subtitle-item'}).length).toBeGreaterThan(0);
  });

  it('always render a CalendarMultipleCheckIcon icon', () => {
    expect(testInstance.findByType(CalendarMultipleCheckIcon)).toBeDefined();
  });
});
