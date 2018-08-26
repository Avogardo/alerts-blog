import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { NewsSchema } from './schema.js';

const News = new Mongo.Collection('news');

News.attachSchema(NewsSchema);

if (Meteor.isServer) {
  News._ensureIndex({ isBreakingNews: -1 });
}

export default News;
