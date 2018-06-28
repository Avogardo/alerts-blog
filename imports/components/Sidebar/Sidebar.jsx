import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-motion-drawer';

import {
  ListItem,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import StarIcon from '@material-ui/icons/Star';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
  list: {
    width: 300,
  },
};

const Sidebar = ({
  classes,
  isSidebarOpen,
  setSidebarState,
  goToSignIn,
}) => (
  <Drawer
    open={isSidebarOpen}
    onChange={open => setSidebarState(open)}
    drawerStyle={{ backgroundColor: 'white' }}
  >
    <div className={classes.list}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Log in" />
        </ListItem>
        <ListItem button onClick={() => goToSignIn()}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Sign in" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="All mail" />
        </ListItem>
      </List>
    </div>
  </Drawer>
);

Sidebar.propTypes = {
  classes: PropTypes.shape({
    list: PropTypes.string.isRequired,
  }).isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  setSidebarState: PropTypes.func.isRequired,
  goToSignIn: PropTypes.func.isRequired,
};

export default withStyles(styles)(Sidebar);
