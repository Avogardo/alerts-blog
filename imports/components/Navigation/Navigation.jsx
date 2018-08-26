import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Input,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';

import {
  FacebookIcon,
  YoutubeIcon,
  EmailOutlineIcon,
  CloseIcon,
} from 'mdi-react';
import Sidebar from '../Sidebar';
import './Navigation.css';

const style = {
  appBar: {
    backgroundColor: '#04091e',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  secondaryAppBar: {
    backgroundColor: '#04091e',
  },
};

const styles = {
  inputSearch: {
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    position: 'relative',
    transition: 'opacity 0.1s ease, top 0.2s ease',
  },
  inputSearchHidden: {
    opacity: 0,
    top: -45,
    visibility: 'hidden',
  },
  inputSearchShowed: {
    opacity: 1,
    top: 0,
    visibility: 'visible',
  },
  button: {
    color: '#ffffff',
    fontSize: 12,
  },
};

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.goToNewsContainer = this.goToNewsContainer.bind(this);
    this.goToTagSearch = this.goToTagSearch.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onTagKeyPress = this.onTagKeyPress.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);

    this.state = {
      isSidebarOpen: false,
      isSearchHidden: true,
      tag: '',
    };
  }

  onLogOut = (isMobile = true) => () => {
    const { onLogOut, history } = this.props;

    if (isMobile) {
      this.toggleSidebar();
    }
    onLogOut(history);
  };

  onTagChange({ target: { value } }) {
    this.setState({
      tag: value.trim().toLowerCase(),
    });
  }

  onTagKeyPress(e) {
    if (e.key === 'Enter') {
      this.goToTagSearch();
    }
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

  goToSignIn = (isMobile = true) => () => {
    const { goToSignIn, history } = this.props;

    if (isMobile) {
      this.toggleSidebar();
    }
    goToSignIn(history);
  };

  goToNewsContainer() {
    const { goToNewsContainer, history } = this.props;
    goToNewsContainer(history);
  }

  goToTagSearch() {
    const { goToTagSearch, history } = this.props;
    const { tag } = this.state;
    goToTagSearch(history, tag);
  }

  goToCreateNews = (isMobile = true) => () => {
    const { goToCreateNews, history } = this.props;

    if (isMobile) {
      this.toggleSidebar();
    }
    goToCreateNews(history);
  };

  toggleSearch() {
    this.setState({
      isSearchHidden: !this.state.isSearchHidden,
    });
  }

  render() {
    const { appBar, toolbar, secondaryAppBar } = style;
    const { isAuthorized, isLoggedInUser } = this.props;
    const {
      inputSearch,
      inputSearchHidden,
      inputSearchShowed,
      button,
    } = this.props.classes;
    const { isSidebarOpen, isSearchHidden, tag } = this.state;

    const navigationElements = [{
      key: 'create-news-button',
      action: this.goToCreateNews(false),
      loggedIn: true,
      text: 'Create news',
    }, {
      key: 'log-out-button',
      action: this.onLogOut(false),
      loggedIn: true,
      text: 'Log out',
    }, {
      key: 'log-in-button',
      action: this.goToSignIn(false),
      loggedIn: false,
      text: 'Log in',
    }, {
      key: 'sign-in-button',
      action: this.goToSignIn(false),
      loggedIn: false,
      text: 'Sign in',
    }];

    return (
      <nav>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarState={open => this.setSidebarState(open)}
          goToSignIn={this.goToSignIn()}
          goToCreateNews={this.goToCreateNews()}
          onLogOut={this.onLogOut()}
          isAuthorized={isAuthorized}
        />

        <AppBar style={appBar} position="static">
          <Toolbar className="navigation-toolbar" style={toolbar}>
            <div>
              <IconButton color="inherit">
                <FacebookIcon size={14} />
              </IconButton>

              <IconButton color="inherit">
                <YoutubeIcon size={14} />
              </IconButton>
            </div>

            <IconButton color="inherit">
              <EmailOutlineIcon size={14} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className="logo-bar">
          <div
            className="logo-container"
            onClick={this.goToNewsContainer}
            role="presentation"
          >
            <img
              alt="logo"
              src="https://drive.google.com/uc?id=1U_HEoR8c2kubf6-JsbHEcwo564J5zjlE"
            />
            <h1>Alarms blog</h1>
          </div>
        </div>

        <AppBar id="navigation-app-bar" style={secondaryAppBar} position="static">
          <Toolbar style={toolbar}>
            <div className="navigation-wrapper-mobile">
              <IconButton onClick={this.toggleSidebar} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                Menu
              </Typography>
            </div>

            <div className="navigation-wrapper">
              {navigationElements
                .filter(element => element.loggedIn === isLoggedInUser)
                .map(({ key, action, text }) => (
                  <Button
                    key={key}
                    onClick={action}
                    className={button}
                  >
                    {text}
                  </Button>
              ))}
            </div>

            <div>
              <Input
                className={['input-search-for-media', inputSearch, isSearchHidden ? inputSearchHidden : inputSearchShowed].join(' ')}
                disableUnderline
                onChange={this.onTagChange}
                onKeyPress={this.onTagKeyPress}
                value={tag}
                placeholder="Search by tag"
              />
              <IconButton onClick={this.toggleSearch} color="inherit">
                {isSearchHidden ?
                  <Search />
                  :
                  <CloseIcon />
                }
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </nav>
    );
  }
}

Navigation.propTypes = {
  goToSignIn: PropTypes.func.isRequired,
  goToNewsContainer: PropTypes.func.isRequired,
  goToTagSearch: PropTypes.func.isRequired,
  goToCreateNews: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isLoggedInUser: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    inputSearch: PropTypes.string.isRequired,
    inputSearchHidden: PropTypes.string.isRequired,
    inputSearchShowed: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Navigation);
