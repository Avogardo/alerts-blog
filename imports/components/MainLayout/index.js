import { compose } from 'react-komposer';
import { actions as userActions } from '../../api/users';
import { actions as newsActions } from '../../api/news';
import MainLayout from './MainLayout.jsx';

const composer = (props, onData) => {
  const { goToSignIn } = userActions;
  const { goToNewsContainer } = newsActions;

  onData(null, {
    goToSignIn,
    goToNewsContainer,
    ...props,
  });
};

export default compose(composer)(MainLayout);
