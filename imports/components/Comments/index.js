import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import { Comments as CommentsCollection } from '/imports/api/comments';
import Comments from './Comments.jsx';

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
  const newsId = props.newsOd;
  const commentsHandler = Meteor.subscribe('newsComments', newsId);

  if (commentsHandler.ready()) {
    const comments = CommentsCollection.find({ newsId }).fetch();

    onData(null, {
      comments,
    });
  }
};

export default compose(getTrackerLoader(composer))(Comments);
