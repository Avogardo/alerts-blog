import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import { News as NewsCollection } from '/imports/api/news';
import { isAdmin } from '../../api/users';
import News from './News.jsx';

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
  const newsId = props.match.params.id;
  const { onRemoveNews } = props;
  const newsHandler = Meteor.subscribe('singleNews', newsId);
  const userListHandler = Meteor.subscribe('userList');

  const unit8ArrayToUrl = (image) => {
    const blob = new Blob([image], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  };

  if (newsHandler.ready()) {
    const news = NewsCollection.find({ _id: newsId }).fetch();
    const userId = Meteor.userId();

    if (userListHandler.ready()) {
      const users = Meteor.users.find({}).fetch();
      const author = [users.find(user => user._id === news[0].authorId).profile.name];

      onData(null, {
        news,
        unit8ArrayToUrl,
        onRemoveNews,
        author,
        isAdmin: isAdmin(userId),
      });
    } else {
      onData(null, {
        news,
        unit8ArrayToUrl,
        onRemoveNews,
        isAdmin: isAdmin(userId),
      });
    }
  }
};

export default compose(getTrackerLoader(composer))(News);
