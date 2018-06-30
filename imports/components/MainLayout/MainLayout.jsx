import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import NewsContainer from '../NewsContainer';
import SignIn from '../SignIn';
import './MainLayout.css';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.goToSignIn = this.goToSignIn.bind(this);
    this.goToNewsContainer = this.goToNewsContainer.bind(this);

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
    const { goToSignIn, history } = this.props;

    this.toggleSidebar();
    goToSignIn(history);
  }

  goToNewsContainer() {
    const { goToNewsContainer, history } = this.props;
    goToNewsContainer(history);
  }

  render() {
    const { isSidebarOpen } = this.state;

    return (
      <div className="container">
        <Navigation
          toggleSidebar={() => this.toggleSidebar()}
          goToNewsContainer={this.goToNewsContainer}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarState={open => this.setSidebarState(open)}
          goToSignIn={this.goToSignIn}
        />
        <div className="content-container" key="content-container">
          <Route exact path="/" component={NewsContainer} />
          <Route exact path="/sign-in" component={SignIn} />
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  goToSignIn: PropTypes.func.isRequired,
  goToNewsContainer: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default MainLayout;
