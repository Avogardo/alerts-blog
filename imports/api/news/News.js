import { Mongo } from 'meteor/mongo';

import { NewsSchema } from './schema.js';

export const collectionName = 'news';
const News = new Mongo.Collection(collectionName);

News.attachSchema(NewsSchema);

export { News };
