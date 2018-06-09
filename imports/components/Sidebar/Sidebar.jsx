import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

const styles = {
  list: {
    width: 250,
  },
};

const Sidebar = (props) => {
  const { classes, isSidebarOpen, toggleSidebar } = props;

  const mailFolderListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Starred" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Send mail" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
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
      <ListItem button>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Trash" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Spam" />
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
  );
};


Sidebar.propTypes = {
  classes: PropTypes.shape({
    list: PropTypes.string.isRequired,
  }).isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default withStyles(styles)(Sidebar);
