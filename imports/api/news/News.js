import { Mongo } from 'meteor/mongo';

import { NewsSchema } from './schema.js';

const News = new Mongo.Collection('news');

News.attachSchema(NewsSchema);

export default News;
