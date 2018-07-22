import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import Navigation from '../Navigation';
import NewsContainer from '../NewsContainer';
import SignIn from '../SignIn';
import CreateNews from '../CreateNews';
import Footer from '../Footer';
import './MainLayout.css';

class MainLayout extends Component {
  render() {
    const {
      isLoggedInUser,
      isAuthorized,
      location,
      history,
    } = this.props;

    return (
      <div className="container">
        <Navigation
          history={history}
          isLoggedInUser={isLoggedInUser}
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
                <NewsContainer exitNews />
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

        <Footer />
      </div>
    );
  }
}

MainLayout.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  isLoggedInUser: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default MainLayout;
