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
  const tagName = ((props.match || {}).params || {}).tag;
  const userListHandler = Meteor.subscribe('userList');
  let topNewsHandler = Meteor.subscribe('quiteRecentNewsWithLimit');
  if (props.enterContainer) {
    topNewsHandler = Meteor.subscribe('recentNewsWithLimit');
  } else if (props.exitContainer) {
    topNewsHandler = Meteor.subscribe('mostPopularNewsListWithLimit');
  } else if (tagName) {
    topNewsHandler = Meteor.subscribe('tagNewsList', tagName);
  }

  const unit8ArrayToUrl = (image) => {
    const blob = new Blob([image], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  };

  if (topNewsHandler.ready()) {
    let options = {
      limit: 4,
      skip: 3,
      sort: { createdAt: -1 },
      fields: {
        images: 0,
      },
    };
    let query = {};
    if (props.enterContainer) {
      options = {
        limit: 3,
        sort: { createdAt: -1 },
        fields: {
          images: 0,
        },
      };
    } else if (props.exitContainer) {
      options = {
        limit: 5,
        sort: { views: -1 },
        fields: {
          images: 0,
        },
      };
    } else if (tagName) {
      options = {
        sort: { createdAt: -1 },
        fields: {
          images: 0,
        },
      };
      if (tagName !== 'all') {
        query = {
          tags: { $all: [tagName] },
        };
      }
    }
    const topNews = NewsCollection.find(query, options).fetch();

    onData(null, {
      ...props,
      topNews,
      tagName,
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
        tagName,
        unit8ArrayToUrl,
        goToNews: newsActions.goToNews,
      });
    }
  } else {
    onData(null, {
      ...props,
      unit8ArrayToUrl,
      tagName,
      goToNews: newsActions.goToNews,
    });
  }
};

export default compose(getTrackerLoader(composer))(NewsContainer);
