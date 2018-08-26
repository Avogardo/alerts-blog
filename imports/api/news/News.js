import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { NewsSchema } from './schema.js';

const News = new Mongo.Collection('news');

News.attachSchema(NewsSchema);

if (Meteor.isServer) {
  News._ensureIndex({ isBreakingNews: -1 });
  News._ensureIndex({ tags: -1 });
  News._ensureIndex({ createdAt: -1 });
}

export default News;
