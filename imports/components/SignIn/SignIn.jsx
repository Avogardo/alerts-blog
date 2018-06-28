import React from 'react';

import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

import './SignIn.css';

const SignIn = () => (
  <section>
    <h2>Create account with Google Plus!</h2>

    <Button variant="raised" color="secondary">
      Google +
      <Delete />
    </Button>
  </section>
);

export default SignIn;
