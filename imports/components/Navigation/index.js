import { compose } from 'react-komposer';
import { onLogOut, actions as userActions } from '../../api/users';
import { actions as newsActions } from '../../api/news';
import Navigation from './Navigation.jsx';

const composer = (props, onData) => {
  const { goToSignIn } = userActions;
  const { goToNewsContainer, goToCreateNews } = newsActions;

  onData(null, {
    ...props,
    goToSignIn,
    goToNewsContainer,
    goToCreateNews,
    onLogOut,
  });
};

export default compose(composer)(Navigation);
