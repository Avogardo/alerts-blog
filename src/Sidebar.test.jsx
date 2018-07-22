import React from 'react';
import ReactDOM from 'react-dom';
import {
  ListItem,
  List,
  ListItemIcon,
} from '@material-ui/core';
import Drawer from 'react-motion-drawer';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Sidebar from '../imports/components/Sidebar/Sidebar.jsx';

describe('Sidebar', () => {
  let props;
  let mountedComponent;

  const div = document.createElement('div');
  const SidebarComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mount(<Sidebar {...props} />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      classes: {
        list: 'width: 300',
      },
      isSidebarOpen: false,
      isLoggedInUser: false,
      setSidebarState: () => {},
      goToSignIn: () => {},
      onLogOut: () => {},
      goToCreateNews: () => {},
      isAuthorized: false,
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

  it('always renders a drawer', () => {
    const drawers = SidebarComponent().find('Drawer');
    expect(drawers.length).toBe(1);
  });

  it('contains everything else that gets rendered', () => {
    const drawers = SidebarComponent().find(Drawer);

    const wrappingDrawer = drawers.first();

    expect(wrappingDrawer.children().length).toBe(SidebarComponent().children().length);
  });

  it('always renders a List elements', () => {
    expect(SidebarComponent().find(List).length).toBeGreaterThan(0);
  });

  it('always renders ListItems elements', () => {
    expect(SidebarComponent().find(ListItem).length).toBeGreaterThan(0);
  });

  it('always renders ListItemIcon elements', () => {
    expect(SidebarComponent().find(ListItemIcon).length).toBeGreaterThan(0);
  });

  it('drawet state is equal to sidebar prop state', () => {
    const drawer = SidebarComponent().find(Drawer);

    expect(drawer.props().open).toBe(SidebarComponent().props().isSidebarOpen);
  });

  it('drawet onChange function is equal to received from props function', () => {
    const drawer = SidebarComponent().find(Drawer);

    expect(drawer.props().onChange()).toBe(SidebarComponent().props().setSidebarState());
  });

  it('drawers list width is equal to received width prop', () => {
    const wrappingDiv = SidebarComponent().find('div').first();

    expect(wrappingDiv.prop('style').width)
      .toBe(Number(SidebarComponent().props().classes.list.slice(-3)));
  });

  describe('user is authorized or not to go to create news component', () => {
    let props;

    beforeEach(() => {
      props = {
        classes: {
          list: 'width: 300',
        },
        isSidebarOpen: false,
        isLoggedInUser: true,
        setSidebarState: () => {},
        goToSignIn: () => {},
        onLogOut: () => {},
        goToCreateNews: () => {},
        isAuthorized: false,
      };
    });

    it('there is no create news button if user is unauthorized', () => {
      const SidebarAuthorisedComponent = mount(<Sidebar {...props} />);
      expect(SidebarAuthorisedComponent.find(AddCircleIcon)).toHaveLength(0);
    });

    it('there is create news button if user is unauthorized', () => {
      props.isAuthorized = true;

      const SidebarAuthorisedComponent = mount(<Sidebar {...props} />);
      expect(SidebarAuthorisedComponent.find(AddCircleIcon)).toHaveLength(1);
    });
  });
});
