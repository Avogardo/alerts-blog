import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { Card } from '@material-ui/core';
import NewsContainer from '../../imports/components/NewsContainer/NewsContainer.jsx';
import EnterNews from '../../imports/components/NewsContainer/EnterNews';
import ExitNews from '../../imports/components/NewsContainer/ExitNews';
import SectionHeader from '../../imports/components/NewsContainer/SectionHeader';

describe('NewsContainer', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      unit8ArrayToUrl: () => {},
      classes: {
        mainNewsCard: '',
        newsCard: '',
      },
    };

    testRenderer = TestRenderer.create(<NewsContainer {...props} />);
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewsContainer {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('Enter container', () => {
    beforeEach(() => {
      props = {
        unit8ArrayToUrl: () => {},
        enterContainer: true,
        classes: {
          mainNewsCard: '',
          newsCard: '',
        },
      };

      testRenderer = TestRenderer.create(<NewsContainer {...props} />);
      testInstance = testRenderer.root;
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<NewsContainer {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('always render a section element', () => {
      expect(testInstance.findByType('section')).toBeDefined();
    });

    it('always render a card element', () => {
      expect(testInstance.findByType(Card)).toBeDefined();
    });

    it('always render a EnterNews element', () => {
      expect(testInstance.findByType(EnterNews)).toBeDefined();
    });
  });

  describe('Exit container', () => {
    beforeEach(() => {
      props = {
        unit8ArrayToUrl: () => {},
        exitContainer: true,
        classes: {
          mainNewsCard: '',
          newsCard: '',
        },
      };

      testRenderer = TestRenderer.create(<NewsContainer {...props} />);
      testInstance = testRenderer.root;
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<NewsContainer {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('always render a section element', () => {
      expect(testInstance.findByType('section')).toBeDefined();
    });

    it('always render a card element', () => {
      expect(testInstance.findByType(Card)).toBeDefined();
    });

    it('always render a ExitNews component', () => {
      expect(testInstance.findByType(ExitNews)).toBeDefined();
    });

    it('always render SectionHeader components', () => {
      expect(testInstance.findAllByType(SectionHeader).length).toBeGreaterThan(1)
    });

    describe('Social SectionHeaders', () => {
      let SectionHeaderComponents;

      beforeEach(() => {
        SectionHeaderComponents = testInstance.findAllByType(SectionHeader);
      });

      it('always render social SectionHeader', () => {
        const SectionHeaderComponent = SectionHeaderComponents.find(header =>
          header.props.secondary,
        );
        expect(SectionHeaderComponent).toBeDefined();
      });

      it('always render facebook SectionHeader', () => {
        const SectionHeaderComponent = SectionHeaderComponents.find(header =>
          header.props.facebook,
        );
        expect(SectionHeaderComponent).toBeDefined();
      });

      it('always render youtube SectionHeader', () => {
        const SectionHeaderComponent = SectionHeaderComponents.find(header =>
          header.props.youtube,
        );
        expect(SectionHeaderComponent).toBeDefined();
      });
    });
  });

  describe('Middle container', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<NewsContainer {...props} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('always render a section element', () => {
      expect(testInstance.findByType('section')).toBeDefined();
    });

    it('always render a card element', () => {
      expect(testInstance.findByType(Card)).toBeDefined();
    });

    it('always render a card element', () => {
      expect(testInstance.findByType(SectionHeader)).toBeDefined();
    });
  });
});
