import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import { actions as commentsActions } from '/imports/api/comments';
import { isAdmin } from '../../../api/users';
import Comment from './Comment.jsx';

const composer = (props, onData) => {
  const userId = Meteor.userId();

  onData(null, {
    ...props,
    isAdmin: isAdmin(userId),
    removeComment: commentsActions.removeComment,
  });
};

export default compose(composer)(Comment);
