import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const styles = {
  list: {
    width: 250,
  },
};

const Sidebar = (props) => {
  const { classes, isSidebarOpen, toggleSidebar } = props;

  const sideList = (
    <div className={classes.list}>
      <List>{mailFolderListItems}</List>
      <Divider />
      <List>{otherMailFolderListItems}</List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleSidebar(true)}>Open Left</Button>

      <SwipeableDrawer
        open={isSidebarOpen}
        onClose={toggleSidebar(false)}
        onOpen={toggleSidebar(true)}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={toggleSidebar(false)}
          onKeyDown={toggleSidebar(false)}
        >
          {sideList}
        </div>
      </SwipeableDrawer>
    </div>
  );
};


Sidebar.propTypes = {
  classes: PropTypes.shape({
    list: PropTypes.shape({
      width: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default withStyles(styles)(Sidebar);
