import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import { Comments as CommentsCollection } from '/imports/api/comments';
import TileSubtitle from './TileSubtitle.jsx';

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
  const { newsId } = props;
  const topNewsHandler = Meteor.subscribe('allNewsComments', newsId);

  if (topNewsHandler.ready()) {
    const commentsAmount = CommentsCollection.find({ newsId }).count();

    onData(null, {
      ...props,
      commentsAmount,
    });
  } else {
    onData(null, {
      ...props,
    });
  }
};

export default compose(getTrackerLoader(composer))(TileSubtitle);
