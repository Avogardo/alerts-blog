import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../imports/components/Sidebar';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';


let props, mountedComponent;
const div = document.createElement('div');
const SidebarComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Sidebar {...props} />
    );
  }
  return mountedComponent;
};

beforeEach(() => {
  props = {
    classes: {
      list: 'width: 250',
    },
    isSidebarOpen: false,
    setSidebarState: () => {},
  };

  mountedComponent = undefined;
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

it("always renders a div", () => {
  const drawers = SidebarComponent().find('Drawer');
  expect(drawers.length).toBeGreaterThan(0);
});
