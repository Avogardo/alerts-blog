import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import Sidebar from '../imports/components/Sidebar';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const styles = {
    list: 'width: 250',
  };

  ReactDOM.render(
    <Sidebar
      classes={styles}
      isSidebarOpen={false}
      setSidebarState={() => {}} />,
    div,
  );

  ReactDOM.unmountComponentAtNode(div);
});
