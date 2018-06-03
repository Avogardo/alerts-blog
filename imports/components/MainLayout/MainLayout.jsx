import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import './MainLayout.css';

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

const MainLayout = () => (
  <div>
    <AppBar style={style.appBar} position="static">
      <Toolbar style={style.toolbar}>
        <div>
          <IconButton color="inherit">
            <svg viewBox="0 0 24 24">
              <path
                d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z"
              />
            </svg>
          </IconButton>

          <IconButton color="inherit">
            <svg viewBox="0 0 24 24">
              <path
                d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,
                  9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,
                  17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,
                  18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,
                  18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,
                  13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,
                  5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,
                  5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
              />
            </svg>
          </IconButton>
        </div>

        <IconButton color="inherit">
          <svg viewBox="0 0 24 24">
            <path
              d="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,
                4 4,4M12,11L20,6H4L12,11M4,18H20V8.37L12,13.36L4,8.37V18Z"
            />
          </svg>
        </IconButton>
      </Toolbar>
    </AppBar>

    <div className="logo-container">
      <img alt="logo" src="https://drive.google.com/uc?id=1U_HEoR8c2kubf6-JsbHEcwo564J5zjlE" />
      <h1>Alarms blog</h1>
    </div>

    <AppBar style={style.secondaryAppBar} position="sticky">
      <Toolbar style={style.toolbar}>
        <div className="navigation-wrapper">
          <IconButton color="inherit" aria-label="Menu">
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
  </div>
);

export default MainLayout;
