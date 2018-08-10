import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Button,
} from '@material-ui/core';
import { FacebookIcon } from 'mdi-react';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: '#4c63a2',
    height: 40,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    position: 'absolute',
    right: 13,
  },
});

const LoginWithFacebookButton = ({ onFacebookLogin, classes }) => (
  <Button
    onClick={() => onFacebookLogin()}
    variant="raised"
    color="primary"
    className={classes.button}
  >
    Continue with Facebook
    <FacebookIcon size={22} className={classes.rightIcon} />
  </Button>
);

LoginWithFacebookButton.propTypes = {
  onFacebookLogin: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(LoginWithFacebookButton);
