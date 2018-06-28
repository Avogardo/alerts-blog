import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation';
import Sidebar from '../Sidebar';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.goToSignIn = this.goToSignIn.bind(this);

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

  goToSignIn() {
    this.toggleSidebar();
    this.props.history.push('/sign-in');
  }

  render() {
    const { isSidebarOpen } = this.state;

    return [
      <Navigation key="navigation" toggleSidebar={() => this.toggleSidebar()} />,
      <Sidebar
        key="sidebar"
        isSidebarOpen={isSidebarOpen}
        setSidebarState={open => this.setSidebarState(open)}
        goToSignIn={this.goToSignIn}
      />,
    ];
  }
}

MainLayout.propTypes = {
  history: PropTypes.object.isRequired,
};

export default MainLayout;
