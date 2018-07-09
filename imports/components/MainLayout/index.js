import { compose } from 'react-komposer';
import {
  isLoggedIn,
  onLogOut,
  isAdmin,
  actions as userActions,
} from '../../api/users';
import { actions as newsActions } from '../../api/news';
import MainLayout from './MainLayout.jsx';

const composer = (props, onData) => {
  const { goToSignIn } = userActions;
  const { goToNewsContainer } = newsActions;
  const isLoggedInUser = isLoggedIn();
  const isAuthorized = isAdmin();

  onData(null, {
    goToSignIn,
    goToNewsContainer,
    isLoggedInUser,
    onLogOut,
    isAuthorized,
    ...props,
  });
};

export default compose(composer)(MainLayout);
