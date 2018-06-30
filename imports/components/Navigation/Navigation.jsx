import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';

import {
  FacebookIcon,
  YoutubeIcon,
  EmailOutlineIcon,
} from 'mdi-react';
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
    margin: '0 15px',
    width: 'auto',
  },
};

const Navigation = ({ toggleSidebar, goToNewsContainer }) => {
  const { appBar, toolbar, secondaryAppBar } = style;

  return (
    <nav>
      <AppBar style={appBar} position="static">
        <Toolbar style={toolbar}>
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

      <div
        className="logo-container"
        onClick={() => goToNewsContainer()}
        role="presentation"
      >
        <img alt="logo" src="https://drive.google.com/uc?id=1U_HEoR8c2kubf6-JsbHEcwo564J5zjlE" />
        <h1>Alarms blog</h1>
      </div>

      <AppBar style={secondaryAppBar} position="static">
        <Toolbar style={toolbar}>
          <div className="navigation-wrapper">
            <IconButton onClick={() => toggleSidebar()} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Menu
            </Typography>
          </div>
          <IconButton color="inherit">
            <Search />
          </IconButton>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

Navigation.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  goToNewsContainer: PropTypes.func.isRequired,
};

export default Navigation;
