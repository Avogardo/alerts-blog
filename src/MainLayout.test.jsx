import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import MainLayout from '../imports/components/MainLayout';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainLayout />, div);
  ReactDOM.unmountComponentAtNode(div);
});
