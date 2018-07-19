import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import NewsContainer from '../NewsContainer';
import SignIn from '../SignIn';
import CreateNews from '../CreateNews';
import './MainLayout.css';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.goToSignIn = this.goToSignIn.bind(this);
    this.goToNewsContainer = this.goToNewsContainer.bind(this);
    this.goToCreateNews = this.goToCreateNews.bind(this);
    this.onLogOut = this.onLogOut.bind(this);

    this.state = {
      isSidebarOpen: false,
    };
  }

  onLogOut() {
    const { onLogOut, history } = this.props;

    this.toggleSidebar();
    onLogOut(history);
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

  goToCreateNews() {
    const { goToCreateNews, history } = this.props;

    this.toggleSidebar();
    goToCreateNews(history);
  }

  render() {
    const { isSidebarOpen } = this.state;
    const { isLoggedInUser, isAuthorized, location } = this.props;

    return (
      <div className="container">
        <Navigation
          toggleSidebar={this.toggleSidebar}
          goToNewsContainer={this.goToNewsContainer}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarState={open => this.setSidebarState(open)}
          goToSignIn={this.goToSignIn}
          goToCreateNews={this.goToCreateNews}
          onLogOut={this.onLogOut}
          isAuthorized={isAuthorized}
        />
        <div
          className={location.pathname === '/' ? 'content-container-root' : 'content-container'}
          key="content-container"
        >
          <Route
            exact
            path="/"
            render={() => (
              <Fragment>
                <NewsContainer enterContainer />
                <NewsContainer headerTitle="Latest News" />
                <NewsContainer exitNews headerTitle="Editor`s Pick" />
              </Fragment>
            )}
          />
          <Route
            exact
            path="/sign-in"
            render={props => (
              isLoggedInUser
                ? <Redirect to="/" />
                : <SignIn {...props} />
              )}
          />
          <Route
            exact
            path="/create-news"
            render={() => (
              isAuthorized
                ? <CreateNews />
                : <Redirect to="/" />
            )}
          />
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  goToSignIn: PropTypes.func.isRequired,
  goToNewsContainer: PropTypes.func.isRequired,
  goToCreateNews: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isLoggedInUser: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default MainLayout;
