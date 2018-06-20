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

  toggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
    });
  }

  closeSidebar(open) {
    this.setState({
      isSidebarOpen: open,
    });
  }

  render() {
    const { isSidebarOpen } = this.state;

    return [
      <Navigation key="navigation" toggleSidebar={() => this.toggleSidebar()} />,
      <Sidebar
        key="sidebar"
        isSidebarOpen={isSidebarOpen}
        closeSidebar={open => this.closeSidebar(open)}
      />,
      <NewsContainer key="news-container" />,
    ];
  }
}

export default MainLayout;
