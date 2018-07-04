import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import { isLoggedIn } from '/imports/api/users';
import SignIn from './SignIn.jsx';
import { actions as newsActions } from '../../api/news';

const composer = (props, onData) => {
  const isLoggedInUser = isLoggedIn();

  if (isLoggedInUser) {
    newsActions.goToNewsContainer(props.history);
  }

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
