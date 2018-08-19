import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import News from './../News.js';

Meteor.publish('news', function publishNewsList() {
  return News.find({});
});

Meteor.publish('tagNewsList', function publishNewsList(tagName = '') {
  const options = {
    sort: { createdAt: -1 },
    fields: {
      images: 0,
    },
  };

  if (tagName === 'all') {
    return News.find({}, options);
  }

  return News.find({ tags: { $all: [tagName] } }, options);
});

Meteor.publish('recentNewsWithLimit', function publishRecentNewsLimit(limit = 3) {
  const options = {
    limit,
    sort: { createdAt: -1 },
    fields: {
      images: 0,
    },
  };
  return News.find({}, options);
});

Meteor.publish(
  'quiteRecentNewsWithLimit',
  function publishQuiteRecentNewsLimit(limit = 4, skip = 3) {
    const options = {
      limit,
      skip,
      sort: { createdAt: -1 },
      fields: {
        images: 0,
      },
    };
    return News.find({}, options);
  },
);

Meteor.publish(
  'singleNews',
  function publishSingleNews(newsId, withPhotos = false, publishBoth = false) {
    check(newsId, String);
    check(withPhotos, Boolean);

    const query = {
      _id: newsId,
    };

    if (publishBoth) {
      return News.find(query);
    }

    const options = {
      fields: {
        images: withPhotos,
      },
    };
    return News.find(query, options);
  },
);
