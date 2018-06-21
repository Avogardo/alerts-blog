import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import Sidebar from '../imports/components/Sidebar';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';


let props = {};
const div = document.createElement('div');
const styles = {
  list: 'width: 250',
};

beforeEach(() => {
  props = {
    classes: styles,
    isSidebarOpen: false,
    setSidebarState: () => {},
  };
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  ReactDOM.render(
    <Sidebar {...props} />,
    div,
  );
});

it('renders without crashing', () => {
  const wrapper = mount(<Sidebar {...props} />);
});

