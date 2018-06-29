import React from 'react';
import ReactDOM from 'react-dom';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import MainLayout from '../imports/components/MainLayout/MainLayout.jsx';
import Navigation from '../imports/components/Navigation';
import Sidebar from '../imports/components/Sidebar';

describe("Main layout", () => {
  let mountedComponent, props, state;

  const MainLayoutComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <MainLayout goToSignIn={() => {}} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
    state = {
      isSidebarOpen: false,
    };

    props = {
      goToSignIn: () => {},
      history:  () => {},
    };
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

  it('renders only 2 childs', () => {
    expect(MainLayoutComponent().children()).toHaveLength(2);
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

  describe("Elements have correct props", () => {
    it('Navigation always have toggleSidebar function', () => {
      expect(MainLayoutComponent().find(Navigation).prop('toggleSidebar')).toBeDefined();
    });

    it('Sidebar always have isSidebarOpen prop equal to isSidebarOpen state', () => {
      expect(MainLayoutComponent().find(Sidebar).prop('isSidebarOpen')).toBe(state.isSidebarOpen);
    });

    it('Sidebar always have setSidebarState function', () => {
      expect(MainLayoutComponent().find(Sidebar).prop('setSidebarState')).toBeDefined();
    });
  });
});
