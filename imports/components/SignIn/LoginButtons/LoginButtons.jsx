import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import LoginWithFacebookButton from './LoginWithFacebookButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';

const LoginButtons = ({ facebook, google, history }) => {
  if (facebook) {
    return <LoginWithFacebookButton history={history} />;
  } else if (google) {
    return <LoginWithGoogleButton history={history} />;
  }
  return '';
};

LoginButtons.defaultProps = {
  facebook: false,
  google: false,
};

LoginButtons.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  facebook: PropTypes.bool,
  google: PropTypes.bool,
};

export default LoginButtons;
