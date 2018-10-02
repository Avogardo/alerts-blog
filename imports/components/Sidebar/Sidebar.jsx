import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-motion-drawer';
import styled from 'styled-components';
import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import StarIcon from '@material-ui/icons/Star';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { LogoutIcon } from 'mdi-react';

const ListContainer = styled.div`
  width: 300px;
`;

const Sidebar = ({
  isSidebarOpen,
  setSidebarState,
  goToSignIn,
  goToCreateNews,
  isLoggedInUser,
  isAuthorized,
  onLogOut,
}) => (
  <Drawer
    open={isSidebarOpen}
    onChange={open => setSidebarState(open)}
    drawerStyle={{ backgroundColor: 'white' }}
  >
    <ListContainer>
      { isLoggedInUser ?
        <List>
          {isAuthorized &&
            <Fragment>
              <ListItem button onClick={goToCreateNews}>
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Create news" />
              </ListItem>
              <Divider />
            </Fragment>
          }
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
            <ListItem button onClick={goToSignIn}>
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
    </ListContainer>
  </Drawer>
);

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setSidebarState: PropTypes.func.isRequired,
  goToSignIn: PropTypes.func.isRequired,
  goToCreateNews: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  isLoggedInUser: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

export default Sidebar;
