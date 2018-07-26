import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { CardHeader } from '@material-ui/core';
import SectionHeader from '../../imports/components/NewsContainer/SectionHeader';

describe('SectionHeader', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      headerTitle: 'Title',
      classes: {
        headerCard: '',
        secondaryHeaderCard: '',
        youtubeHeader: '',
        socialIconButton: '',
        facebookHeader: '',
      },
    };

    testRenderer = TestRenderer.create(<SectionHeader {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SectionHeader {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always render a CardHeader element', () => {
    expect(testInstance.findByType(CardHeader)).toBeDefined();
  });

  it('always render a span title inside card header', () => {
    expect(testInstance.findByType(CardHeader).findByType('span')).toBeDefined();
  });

  describe('Youtube', () => {
    beforeEach(() => {
      props = {
        youtube: true,
        classes: {
          headerCard: '',
          secondaryHeaderCard: '',
          youtubeHeader: '',
          socialIconButton: '',
          facebookHeader: '',
        },
      };

      testRenderer = TestRenderer.create(<SectionHeader {...props} />);
      testInstance = testRenderer.root;
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<SectionHeader {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
