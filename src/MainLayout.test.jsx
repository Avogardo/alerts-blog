import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from '../imports/components/MainLayout';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainLayout />, div);
  ReactDOM.unmountComponentAtNode(div);
});
