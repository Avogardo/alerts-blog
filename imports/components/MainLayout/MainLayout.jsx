import React from 'react';

import Navigation from '../Navigation';
import NewsContainer from '../NewsContainer';
import Sidebar from '../Sidebar';

class MainLayout extends React.Component {
  state = {
    isSidebarOpen: false,
  };

  toggleSidebar = () => () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
    });
  };

  render() {
    const { isSidebarOpen } = this.state;

    return (
      <div>
        <Navigation />

        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={this.toggleSidebar()} />

        <NewsContainer />
      </div>
    );
  }
}

export default MainLayout;
