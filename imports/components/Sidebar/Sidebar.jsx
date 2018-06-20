import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBox from '@material-ui/icons/AccountBox';
import StarIcon from '@material-ui/icons/Star';
import MailIcon from '@material-ui/icons/Mail';

import Drawer from 'react-motion-drawer';

const styles = {
  list: {
    width: 250,
  },
};

const Sidebar = (props) => {
  const { classes, isSidebarOpen, closeSidebar } = props;

  const mailFolderListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Log in" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Sign in" />
      </ListItem>
    </div>
  );

  const otherMailFolderListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="All mail" />
      </ListItem>
    </div>
  );

  const sideList = (
    <div className={classes.list}>
      <List>{mailFolderListItems}</List>
      <Divider />
      <List>{otherMailFolderListItems}</List>
    </div>
  );

  return (
    <Drawer
      open={isSidebarOpen}
      onChange={open => closeSidebar(open)}
      drawerStyle={{ backgroundColor: 'white' }}
    >
      {sideList}
    </Drawer>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.shape({
    list: PropTypes.string.isRequired,
  }).isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

export default withStyles(styles)(Sidebar);
