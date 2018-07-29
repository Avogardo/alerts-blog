import { compose } from 'react-komposer';
import { actions as commentsActions } from '/imports/api/comments';
import { isLoggedIn } from '../../../api/users';
import AddComment from './AddComment.jsx';

const composer = (props, onData) => {
  onData(null, {
    ...props,
    isLoggedIn: isLoggedIn(),
    createComment: commentsActions.createComment,
  });
};

export default compose(composer)(AddComment);
