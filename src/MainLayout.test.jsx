import React from 'react';
import ReactDOM from 'react-dom';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import MainLayout from '../imports/components/MainLayout';
import Navigation from '../imports/components/Navigation';
import Sidebar from '../imports/components/Sidebar';
import NewsContainer from '../imports/components/NewsContainer';

describe("Main layout", () => {
  let mountedComponent, state;
  const MainLayoutComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <MainLayout />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
    state = {
      isSidebarOpen: false,
    }
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MainLayout />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('always renders a Navigation component', () => {
    expect(MainLayoutComponent().find(Navigation)).toBeDefined();
  });

  it('always renders a Sidebar component', () => {
    expect(MainLayoutComponent().find(Sidebar)).toBeDefined();
  });

  it('always renders a NewsContainer component', () => {
    expect(MainLayoutComponent().find(NewsContainer)).toBeDefined();
  });

  it('always renders only 3 childs', () => {
    expect(MainLayoutComponent().children()).toHaveLength(3);
  });

  describe("Main layout states", () => {
    it('has expected state', () => {
      expect(MainLayoutComponent().state()).toEqual(state);
    });

    it('setSidebarState is setting isSidebarOpen state value', () => {
      const wrapper = shallow(<MainLayout />);
      wrapper.instance().setSidebarState(true);

      expect(wrapper.state().isSidebarOpen).toBe(true);
    });

    it('toggleSidebar is setting negation of isSidebarOpen state', () => {
      const wrapper = shallow(<MainLayout />);

      wrapper.instance().toggleSidebar();
      expect(wrapper.state().isSidebarOpen).toBe(!state.isSidebarOpen);

      wrapper.instance().toggleSidebar();
      expect(wrapper.state().isSidebarOpen).toBe(state.isSidebarOpen);
    });
  });
});
