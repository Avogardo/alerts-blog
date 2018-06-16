import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import NewsContainer from '../NewsContainer';

import './MainLayout.css';
import FacebookIcon from './Icons/FacebookIcon.jsx';
import Sidebar from '../Sidebar';
import YoutubeIcon from './Icons/YoutubeIcon.jsx';

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

class MainLayout extends React.Component {
  state = {
    isSidebarOpen: false,
  };

  toggleSidebar = () => () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen,
    });
  };

  render() {
    const { isSidebarOpen } = this.state;

    return (
      <div>
        <AppBar style={style.appBar} position="static">
          <Toolbar style={style.toolbar}>
            <div>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>

              <IconButton color="inherit">
                <YoutubeIcon />
              </IconButton>
            </div>

            <IconButton color="inherit">
              <svg viewBox="0 0 24 24">
                <path
                  d="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,
                  4 4,4M12,11L20,6H4L12,11M4,18H20V8.37L12,13.36L4,8.37V18Z"
                  fill="#ffffff"
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
              <IconButton onClick={this.toggleSidebar(false)} color="inherit" aria-label="Menu">
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

        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={this.toggleSidebar()} />

        <NewsContainer />
      </div>
    );
  }
}

export default MainLayout;
