import { compose } from 'react-komposer';
import { actions as commentsActions } from '/imports/api/comments';
import AddComment from './AddComment.jsx';

const composer = (props, onData) => {
  onData(null, {
    ...props,
    createComment: commentsActions.createComment,
  });
};

export default compose(composer)(AddComment);
