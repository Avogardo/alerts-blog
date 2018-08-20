import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Snackbar } from '@material-ui/core';

import { HistoryContext } from '../Context';
import Navigation from '../Navigation';
import NewsContainer from '../NewsContainer';
import SignIn from '../SignIn';
import CreateNews from '../CreateNews';
import Footer from '../Footer';
import News from '../News';
import SectionHeader from '../NewsContainer/SectionHeader';
import './MainLayout.css';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.onRemoveNews = this.onRemoveNews.bind(this);

    this.state = {
      snackBarMessage: '',
      isSnackBarOpen: false,
    };
  }

  onRemoveNews(newsId) {
    const { removeNews, goToNewsContainer, history } = this.props;
    goToNewsContainer(history);

    removeNews(newsId).then(() => {
      this.setState({
        snackBarMessage: 'Comment has been removed',
        isSnackBarOpen: true,
      });
    }).catch((error) => {
      this.setState({
        snackBarMessage: `Error: ${error.message}`,
        isSnackBarOpen: true,
      });
    });
  }

  snackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      isSnackBarOpen: false,
    });
  };

  render() {
    const {
      isLoggedInUser,
      isAuthorized,
      location,
      history,
    } = this.props;
    const { snackBarMessage, isSnackBarOpen } = this.state;

    const shouldHideBackground = (
      location.pathname === '/' ||
      location.pathname.includes('/news/') ||
      location.pathname.includes('/tag/')
    );

    return (
      <div className="container">
        <Navigation
          history={history}
          isLoggedInUser={isLoggedInUser}
          isAuthorized={isAuthorized}
        />

        <div
          className={shouldHideBackground ? 'content-container-root' : 'content-container'}
          key="content-container"
        >
          <HistoryContext.Provider value={history}>
            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <NewsContainer enterContainer />
                  <div className="body-news-section-wrapper">
                    <NewsContainer headerTitle="Latest News" />
                    <NewsContainer exitContainer />
                  </div>
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
              path="/create-news/:id?"
              render={routeProps => (
                isAuthorized
                  ? <CreateNews match={routeProps.match} history={routeProps.history} />
                  : <Redirect to="/" />
              )}
            />

            <Route
              exact
              path="/news/:id"
              render={routeProps => [
                <div key="breaking-news" className="breaking-news-wrapper">
                  <SectionHeader breakingNews />
                </div>,
                <div key="single-news-wrapper" className="single-news-wrapper">
                  <News
                    key="news-section"
                    history={routeProps.history}
                    match={routeProps.match}
                    onRemoveNews={this.onRemoveNews}
                  />
                  <NewsContainer key="exit-news-section" exitContainer />
                </div>,
              ]}
            />

            <Route
              exact
              path="/tag/:tag"
              render={props => <NewsContainer {...props} />}
            />
          </HistoryContext.Provider>
        </div>

        <Footer />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isSnackBarOpen}
          autoHideDuration={3500}
          onClose={this.snackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackBarMessage}</span>}
        />
      </div>
    );
  }
}

MainLayout.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  isLoggedInUser: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  removeNews: PropTypes.func.isRequired,
  goToNewsContainer: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default MainLayout;
