import { Meteor } from 'meteor/meteor';
import News from './../News.js';

Meteor.publish('news', function publishNewsList() {
  return News.find({});
});
