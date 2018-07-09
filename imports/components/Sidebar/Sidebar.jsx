import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-motion-drawer';

import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import StarIcon from '@material-ui/icons/Star';
import { LogoutIcon } from 'mdi-react';

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
  isLoggedInUser,
  onLogOut,
}) => (
  <Drawer
    open={isSidebarOpen}
    onChange={open => setSidebarState(open)}
    drawerStyle={{ backgroundColor: 'white' }}
  >
    <div className={classes.list}>
      { isLoggedInUser ?
        <List>
          <ListItem button onClick={onLogOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      :
        <Fragment>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Log in" />
            </ListItem>
            <ListItem button onClick={goToSignIn}>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Sign in" />
            </ListItem>
          </List>
        </Fragment>
        }
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
  onLogOut: PropTypes.func.isRequired,
  isLoggedInUser: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Sidebar);
