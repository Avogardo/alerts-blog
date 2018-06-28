import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Navigation from '../Navigation';
import NewsContainer from '../NewsContainer';
import Sidebar from '../Sidebar';
import SignIn from '../SignIn';

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

    return (
      <Fragment>
        <Navigation key="navigation" toggleSidebar={() => this.toggleSidebar()} />
        <Sidebar
          key="sidebar"
          isSidebarOpen={isSidebarOpen}
          setSidebarState={open => this.setSidebarState(open)}
        />

        <Route exact path="/" component={NewsContainer} />
        <Route exact path="/sign-in" component={SignIn} />
      </Fragment>
    );
  }
}

export default MainLayout;
