import React, { Component } from 'react';

import Navigation from '../Navigation';
import NewsContainer from '../NewsContainer';
import Sidebar from '../Sidebar';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    this.state = {
      isSidebarOpen: false,
    };
  }

  setSidebarState(open) {
    this.setState({
      isSidebarOpen: open,
    });
  }

  toggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
    });
  }

  render() {
    const { isSidebarOpen } = this.state;

    return [
      <Navigation key="navigation" toggleSidebar={() => this.toggleSidebar()} />,
      <Sidebar
        key="sidebar"
        isSidebarOpen={isSidebarOpen}
        setSidebarState={open => this.setSidebarState(open)}
      />,
      <NewsContainer key="news-container" />,
    ];
  }
}

export default MainLayout;
