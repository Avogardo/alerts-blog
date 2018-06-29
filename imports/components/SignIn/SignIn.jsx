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
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  signIn: {
    padding: '10px',
  },
});

const SignIn = ({ classes }) => (
  <section className={classes.signIn}>
    <h2>Create account with Google Plus!</h2>

    <Button variant="raised" color="secondary" className={classes.button}>
      Continue with Google
      <GooglePlusIcon className={classes.rightIcon} />
    </Button>
  </section>
);

SignIn.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired,
    signIn: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SignIn);
