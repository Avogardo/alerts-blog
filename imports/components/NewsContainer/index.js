import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import { News as NewsCollection, actions as newsActions } from '/imports/api/news';
import NewsContainer from './NewsContainer.jsx';

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
  const tagName = props.match.params.tag;
  const userListHandler = Meteor.subscribe('userList');
  const topNewsHandler = tagName ?
    Meteor.subscribe('tagNewsList', tagName)
    :
    Meteor.subscribe('recentNewsWithLimit', 4);

  const unit8ArrayToUrl = (image) => {
    const blob = new Blob([image], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  };

  if (topNewsHandler.ready()) {
    const options = {
      limit: props.enterContainer ? 3 : 4,
    };
    const topNews = NewsCollection.find({}, options).fetch();

    onData(null, {
      ...props,
      topNews,
      unit8ArrayToUrl,
      goToNews: newsActions.goToNews,
    });

    if (userListHandler.ready()) {
      const users = Meteor.users.find({}).fetch();
      const authors = topNews.map(news =>
        users.find(user => user._id === news.authorId).profile.name);

      onData(null, {
        ...props,
        topNews,
        authors,
        unit8ArrayToUrl,
        goToNews: newsActions.goToNews,
      });
    }
  } else {
    onData(null, {
      ...props,
      unit8ArrayToUrl,
      goToNews: newsActions.goToNews,
    });
  }
};

export default compose(getTrackerLoader(composer))(NewsContainer);
