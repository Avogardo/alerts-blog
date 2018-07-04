import { compose } from 'react-komposer';
import { isLoggedIn } from '../../api/users';
import Sidebar from './Sidebar.jsx';

const composer = (props, onData) => {
  const isLoggedInUser = isLoggedIn();

  onData(null, {
    isLoggedInUser,
    ...props,
  });
};

export default compose(composer)(Sidebar);
