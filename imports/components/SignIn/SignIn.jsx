import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Button,
  CardContent,
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
  signIn: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
});

const SignIn = ({ classes, errorMessage, onGoogleLogin }) => (
  <form className={classes.signIn}>
    <h2>Create account with Google Plus!</h2>

    <Button
      onClick={() => onGoogleLogin()}
      variant="raised"
      color="secondary"
      className={classes.button}
    >
      Continue with Google
      <GooglePlusIcon className={classes.rightIcon} />
    </Button>

    {errorMessage &&
      <CardContent>
        {errorMessage}
      </CardContent>
    }
  </form>
);

SignIn.defaultProps = {
  errorMessage: '',
};

SignIn.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired,
    signIn: PropTypes.string.isRequired,
  }).isRequired,
  onGoogleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(SignIn);
