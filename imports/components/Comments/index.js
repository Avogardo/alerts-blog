import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import {
  Comments as CommentsCollection,
  actions as commentsActions,
} from '/imports/api/comments';
import Comments from './Comments.jsx';
import AddComment from './AddComment';

const getTrackerLoader = composer =>
  (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() =>
      Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = composer(props, onData, env);
      }));

    return () => {
      if (typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };

const composer = (props, onData) => {
  const { newsId, parentId } = props;
  const { removeComment } = commentsActions;
  const commentsHandler = parentId ?
    Meteor.subscribe('commentComments', newsId, parentId) :
    Meteor.subscribe('newsComments', newsId);
  const userListHandler = Meteor.subscribe('userList');

  if (commentsHandler.ready() && userListHandler.ready()) {
    const commentAmount = CommentsCollection.find({ newsId }).count();
    const users = Meteor.users.find({}).fetch();
    const commentsCursor = parentId ?
      CommentsCollection.find({ newsId, parentId }) :
      CommentsCollection.find({ newsId, parentId: null });

    const comments = commentsCursor.fetch().map((comment) => {
      if (comment.authorId) {
        const author = users.find(user => user._id === comment.authorId);
        comment.author = {
          name: author.profile.name,
          avatar: author.profile.avatar,
        };
      } else {
        comment.author = {
          name: comment.username,
        };
      }

      return comment;
    });

    onData(null, {
      ...props,
      comments,
      commentAmount,
      removeComment,
    });
  } else {
    onData(null, {
      ...props,
      removeComment,
    });
  }
};

export { AddComment };
export default compose(getTrackerLoader(composer))(Comments);
