import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';

import './Navigation.css';
import FacebookIcon from './Icons/FacebookIcon.jsx';
import YoutubeIcon from './Icons/YoutubeIcon.jsx';
import EmailIcon from './Icons/EmailIcon.jsx';

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

const Navigation = ({ toggleSidebar }) => {
  const { appBar, toolbar, secondaryAppBar } = style;

  return (
    <nav>
      <AppBar style={appBar} position="static">
        <Toolbar style={toolbar}>
          <div>
            <IconButton color="inherit">
              <FacebookIcon />
            </IconButton>

            <IconButton color="inherit">
              <YoutubeIcon />
            </IconButton>
          </div>

          <IconButton color="inherit">
            <EmailIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="logo-container">
        <img alt="logo" src="https://drive.google.com/uc?id=1U_HEoR8c2kubf6-JsbHEcwo564J5zjlE" />
        <h1>Alarms blog</h1>
      </div>

      <AppBar style={secondaryAppBar} position="sticky">
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
};

export default Navigation;
