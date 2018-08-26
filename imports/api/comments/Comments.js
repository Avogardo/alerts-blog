import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { CommentsSchema } from './schema.js';

const Comments = new Mongo.Collection('cmments');

Comments.attachSchema(CommentsSchema);

if (Meteor.isServer) {
  Comments._ensureIndex({ newsId: -1 });
}

export default Comments;
