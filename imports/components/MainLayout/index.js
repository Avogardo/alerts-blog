import { compose } from 'react-komposer';
import { actions as userActions } from '../../api/users';
import MainLayout from './MainLayout.jsx';

const composer = (props, onData) => {
  const { goToSignIn } = userActions;

  onData(null, {
    goToSignIn,
    ...props,
  });
};

export default compose(composer)(MainLayout);
