import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Route, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Snackbar } from '@material-ui/core';

import { sizes } from '../../../src/appHelper';
import { HistoryContext } from '../Context';
import Navigation from '../Navigation';
import NewsContainer from '../NewsContainer';
import SignIn from '../SignIn';
import CreateNews from '../CreateNews';
import Footer from '../Footer';
import News from '../News';
import SectionHeader from '../NewsContainer/SectionHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (max-width: ${sizes.mobile}px) {
    min-height: calc(100vh - 60px);
  }
`;
const ContentContainer = styled.div`
  width: 1140px;
  margin: 0 auto 15px auto;
  flex: 1 1 auto;

  ${props => !!props.contentcontainermain && css`
    background-color: #ffffff;
  `}

  @media (max-width: ${sizes.desktop}px) {
    width: auto;
    margin: 0 15px 15px 15px;
  }
`;
const BodyNewsSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  section:first-child {
    width: 750px;
  }
  section:last-child {
    width: 360px;
  }

  @media (max-width: ${sizes.desktop}px) {
    display: block;

    section:first-child, section:last-child {
      width: unset;
    }
  }
`;
const SingleNewsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  > article {
    width: 750px;
  }
  > section  {
    width: 360px;
  }

  @media (max-width: ${sizes.desktop}px) {
    display: block;

    > article, > section {
      width: unset;
    }
  }
`;
const BreakingNewsWrapper = styled.div`
  margin-top: 10px;
`;

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
      <Container>
        <Navigation
          history={history}
          isLoggedInUser={isLoggedInUser}
          isAuthorized={isAuthorized}
        />

        <ContentContainer contentcontainermain={shouldHideBackground ? 0 : 1}>
          <HistoryContext.Provider value={history}>
            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <NewsContainer enterContainer />
                  <BodyNewsSectionWrapper>
                    <NewsContainer headerTitle="Latest News" />
                    <NewsContainer exitContainer />
                  </BodyNewsSectionWrapper>
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
                <BreakingNewsWrapper key="breaking-news">
                  <SectionHeader breakingNews />
                </BreakingNewsWrapper>,
                <SingleNewsWrapper key="single-news-wrapper">
                  <News
                    key="news-section"
                    history={routeProps.history}
                    match={routeProps.match}
                    onRemoveNews={this.onRemoveNews}
                  />
                  <NewsContainer key="exit-news-section" exitContainer />
                </SingleNewsWrapper>,
              ]}
            />

            <Route
              exact
              path="/tag/:tag"
              render={props => <NewsContainer {...props} />}
            />
          </HistoryContext.Provider>
        </ContentContainer>

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
      </Container>
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
