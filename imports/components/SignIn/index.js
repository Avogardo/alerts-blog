import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import SignIn from './SignIn.jsx';

const composer = (props, onData) => {
  const onGoogleLogin = () => Meteor.loginWithGoogle(
    { requestPermissions: ['email'] },
    (error) => {
      if (error) {
        const errorMessage = error.message ? error.message : error;
        onData(null, {
          onGoogleLogin,
          errorMessage,
        });
      }
    },
  );

  onData(null, {
    onGoogleLogin,
    ...props,
  });
};

export default compose(composer)(SignIn);
