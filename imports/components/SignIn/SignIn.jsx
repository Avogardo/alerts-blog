import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { CardContent } from '@material-ui/core';
import styled from 'styled-components';
import { sizes } from '../../../src/appHelper';
import LoginButtons from './LoginButtons';

const DefaultFileInput = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${sizes.mobile}px) {
    width: unset;
    margin-left: unset;
    margin-right: unset;
  }
`;

const SignIn = ({ errorMessage, history }) => (
  <DefaultFileInput>
    <h2>Create account with Facebook or Google Plus!</h2>

    <LoginButtons history={history} facebook />
    <LoginButtons history={history} google />

    {errorMessage &&
      <CardContent>
        Error: {errorMessage}. Please try again later.
      </CardContent>
    }
  </DefaultFileInput>
);

SignIn.defaultProps = {
  errorMessage: '',
};

SignIn.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  errorMessage: PropTypes.string,
};

export default SignIn;
