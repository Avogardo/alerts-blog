import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import News from './../News.js';

Meteor.publish('news', function publishNewsList() {
  return News.find({});
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

Meteor.publish('singleNews', function publishSingleNews(newsId) {
  check(newsId, String);

  const query = {
    _id: newsId,
  };

  const options = {};

  return News.find(query, options);
});
