import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer, {
  DrawerContainer,
  MainContentContainer,
} from 'react-swipeable-drawer';

import DrawerContent from './DrawerContent.jsx';
import './MainContent.css';
import CupcakeIpsum from './CupcakeIpsum.jsx';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBox from '@material-ui/icons/AccountBox';
import StarIcon from '@material-ui/icons/Star';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
  list: {
    width: 250,
  },
};

const MailFolderListItems = () => (
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

const OtherMailFolderListItems = () => (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="All mail" />
    </ListItem>
  </div>
);

const Sidebar = () => (
  <Drawer position="left" size={80}>
    {({
        position,
        size,
        swiping,
        translation,
        mainContentScroll,
        toggleDrawer,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
      }) => (
        <div>
          <DrawerContainer
            position={position}
            size={size}
            swiping={swiping}
            translation={translation}
            toggleDrawer={toggleDrawer}
            handleTouchStart={handleTouchStart}
            handleTouchMove={handleTouchMove}
            handleTouchEnd={handleTouchEnd}
            drawerContent={<DrawerContent />}
          />
          <MainContentContainer
            translation={translation}
            mainContentScroll={mainContentScroll}
          />
        </div>
    )}
  </Drawer>
);

Sidebar.propTypes = {
  classes: PropTypes.shape({
    list: PropTypes.string.isRequired,
  }).isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default withStyles(styles)(Sidebar);
