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

  render() {
    const { isSidebarOpen } = this.state;

    return (
      <div>
        <Navigation toggleSidebar={() => this.toggleSidebar()} />

        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => this.toggleSidebar()} />

        <NewsContainer />
      </div>
    );
  }
}

export default MainLayout;
