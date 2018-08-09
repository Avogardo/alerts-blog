import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import News from './../News.js';

Meteor.publish('news', function publishNewsList() {
  return News.find({});
});

Meteor.publish('tagNewsList', function publishNewsList(tagName = '') {
  return News.find({ tags: { $all: [tagName] } });
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
