import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from 'react-motion-drawer';
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
      list: 'width: 300',
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

it('always renders a div', () => {
  const drawers = SidebarComponent().find('Drawer');
  expect(drawers.length).toBe(1);
});

it('contains everything else that gets rendered', () => {
  const drawers = SidebarComponent().find(Drawer);

  const wrappingDrawer = drawers.first();

  expect(wrappingDrawer.children().length).toBe(SidebarComponent().children().length);
});

it("always renders a List elements", () => {
  expect(SidebarComponent().find(List).length).toBeGreaterThan(0);
});

it("always renders ListItems elements", () => {
  expect(SidebarComponent().find(ListItem).length).toBeGreaterThan(0);
});

it("always renders ListItemIcon elements", () => {
  expect(SidebarComponent().find(ListItemIcon).length).toBeGreaterThan(0);
});

it("drawet state is equal to sidebar prop state", () => {
  const drawer = SidebarComponent().find(Drawer);

  expect(drawer.props().open).toBe(SidebarComponent().props().isSidebarOpen);
});

it("drawet onChange function is equal to received from props function", () => {
  const drawer = SidebarComponent().find(Drawer);

  expect(drawer.props().onChange()).toBe(SidebarComponent().props().setSidebarState());
});

it("drawers list width is equal to received width prop", () => {
  const wrappingDiv  = SidebarComponent().find('div').first();

  expect(wrappingDiv.prop('style').width)
    .toBe(Number(SidebarComponent().props().classes.list.slice(-3)));
});
