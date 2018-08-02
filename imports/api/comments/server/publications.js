import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Comments from './../Comments.js';

Meteor.publish('newsComments', function publishNewsComments(newsId) {
  check(newsId, String);

  return Comments.find({ newsId, parentId: null });
});

Meteor.publish('commentComments', function publishNewsComments(newsId, parentId) {
  check(newsId, String);
  check(parentId, String);

  return Comments.find({ newsId, parentId });
});
