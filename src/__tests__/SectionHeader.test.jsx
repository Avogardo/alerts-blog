import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
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
});
