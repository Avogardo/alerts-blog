import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Button,
} from '@material-ui/core';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: '#d34836',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const LoginWithGoogleButton = ({ onGoogleLogin, classes }) => (
  <Button
    onClick={() => onGoogleLogin()}
    variant="raised"
    color="secondary"
    className={classes.button}
  >
    Continue with Google
    <GooglePlusIcon className={classes.rightIcon} />
  </Button>
);

LoginWithGoogleButton.propTypes = {
  onGoogleLogin: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(LoginWithGoogleButton);
