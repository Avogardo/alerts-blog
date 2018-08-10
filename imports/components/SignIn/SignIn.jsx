import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  withStyles,
  CardContent,
} from '@material-ui/core';
import LoginButtons from './LoginButtons';

const styles = () => ({
  signIn: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
});

const SignIn = ({ classes, errorMessage, history }) => (
  <form className={classes.signIn}>
    <h2>Create account with Google Plus!</h2>

    <LoginButtons history={history} facebook />
    <LoginButtons history={history} google />

    {errorMessage &&
      <CardContent>
        Error: {errorMessage}. Please try again later.
      </CardContent>
    }
  </form>
);

SignIn.defaultProps = {
  errorMessage: '',
};

SignIn.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  classes: PropTypes.shape({
    signIn: PropTypes.string.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(SignIn);
