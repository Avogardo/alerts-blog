import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import { actions as newsActions } from '../../../../api/news';
import LoginWithFacebookButton from './LoginWithFacebookButton.jsx';

const composer = (props, onData) => {
  const onFacebookLogin = () => Meteor.loginWithFacebook(
    { requestPermissions: ['email'] },
    (error) => {
      if (error) {
        const errorMessage = error.message ? error.message : error;
        onData(null, {
          onFacebookLogin,
          errorMessage,
        });
      } else {
        newsActions.goToNewsContainer(props.history);
      }
    },
  );

  onData(null, {
    onFacebookLogin,
    ...props,
  });
};

export default compose(composer)(LoginWithFacebookButton);
