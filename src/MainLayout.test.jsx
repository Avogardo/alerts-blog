import React from 'react';
import ReactDOM from 'react-dom';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import MainLayout from '../imports/components/MainLayout';
import Navigation from '../imports/components/Navigation';
import Sidebar from '../imports/components/Sidebar';
import NewsContainer from '../imports/components/NewsContainer';

describe("Main layout", () => {
  let mountedComponent;
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

  it('always renders only 3 childs', () => {
    expect(MainLayoutComponent().children()).toHaveLength(3);
  });
});
