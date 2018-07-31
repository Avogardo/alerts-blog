import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { CardHeader, IconButton } from '@material-ui/core';
import { YoutubeIcon } from 'mdi-react';
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

    it('always render wrappers inside card header title', () => {
      expect(testInstance.findByType(CardHeader).findByProps({className: 'social-header-content-wrapper'}))
        .toBeDefined();
      expect(testInstance.findByType(CardHeader).findByProps({className: 'social-header-wrapper'}))
        .toBeDefined();
    });

    it('always render a IconButton element', () => {
      expect(testInstance.findByType(IconButton)).toBeDefined();
    });

    it('always render a YoutubeIcon element', () => {
      expect(testInstance.findByType(YoutubeIcon)).toBeDefined();
    });

    it('always render a social header element', () => {
      expect(testInstance.findByProps({className: 'social-header'})).toBeDefined();
    });

    it('always render a social header action element', () => {
      expect(testInstance.findByProps({className: 'social-header-action'})).toBeDefined();
    });
  });

  describe('Breaking news', () => {
    beforeEach(() => {
      props = {
        breakingNews: true,
        headerTitle: 'title',
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
