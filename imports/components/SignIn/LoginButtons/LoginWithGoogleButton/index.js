import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import { actions as newsActions } from '../../../../api/news';
import LoginWithGoogleButton from './LoginWithGoogleButton.jsx';

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
      } else {
        newsActions.goToNewsContainer(props.history);
      }
    },
  );

  onData(null, {
    onGoogleLogin,
    ...props,
  });
};

export default compose(composer)(LoginWithGoogleButton);
