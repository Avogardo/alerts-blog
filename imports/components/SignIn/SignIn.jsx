import React from 'react';
import Button from '@material-ui/core/Button';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import './SignIn.css';

const SignIn = () => (
  <section>
    <h2>Create account with Google Plus!</h2>

    <Button variant="raised" color="secondary">
      Continue with Google
      <GooglePlusIcon />
    </Button>
  </section>
);

export default SignIn;
