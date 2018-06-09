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

class Sidebar extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = open => () => {
    this.setState({
      left: open,
    });
  };

  render() {
    const { classes, isSidebarOpen } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer(true)}>Open Left</Button>

        <SwipeableDrawer
          open={isSidebarOpen}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.shape({
    list: PropTypes.shape({
      width: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Sidebar);
