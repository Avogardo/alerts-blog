import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import {
  CardActions,
  TextField,
  Button,
} from '@material-ui/core';
import CreateNews from '../../imports/components/CreateNews/CreateNews.jsx';

describe('Create news', () => {
  let props;
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    props = {
      createNews: () => {},
      updateNews: () => {},
      goToNews: () => {},
    };

    testRenderer = TestRenderer.create(
      <MemoryRouter>
        <CreateNews {...props} />
      </MemoryRouter>
    );
    testInstance = testRenderer.root;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <CreateNews {...props} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always renders a form', () => {
    expect(testInstance.findAllByType('form')).toHaveLength(1);
  });

  it('always renders 4 CardActions', () => {
    expect(testInstance.findAllByType(CardActions)).toHaveLength(4);
  });

  it('always renders 2 TextField', () => {
    expect(testInstance.findAllByType(TextField)).toHaveLength(2);
  });

  it('always renders 3 buttons', () => {
    expect(testInstance.findAllByType(Button)).toHaveLength(3);
  });

  describe('file button', () => {
    it('always render a input type file', () => {
      const inputFile = testInstance.findAllByType('input').find(input =>
        input.props.type === 'file',
      );

      expect(inputFile).toBeDefined();
    });

    it('input type file has it material ui own button ', () => {
      const inputFile = testInstance.findAllByType('input').find(input =>
        input.props.type === 'file',
      );
      const inputId = inputFile.props.id;

      expect(testInstance.findByProps({ htmlFor: inputId }).findByType(Button)).toBeDefined();
    });
  });
});
