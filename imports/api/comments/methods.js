import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { isAdmin } from '/imports/api/users';
import {
  AddCommentSchema,
  RemoveCommentSchema,
  UpdateCommentSchema,
} from './schema.js';
import Comments from './Comments.js';

const throwErrorIfNotAdmin = () => {
  if (!isAdmin()) {
    throw new Meteor.Error(
      'create.comment.unauthorized',
      'Only redactor is authorized to carry out this operation',
    );
  }
};

/**
 * Create new comment
 * @param   { String }  content  comment content
 * @param   { String }  newsId   comment content
 * @param   { String }  parentId comment content optional
 * @return  { String }           comment
 */
const createComment = new ValidatedMethod({
  name: 'comment.add',
  validate: AddCommentSchema.validator({ clean: true }),
  run({
    username,
    content,
    newsId,
    parentId,
  }) {
    if (content.length < 5) {
      throw new Meteor.Error(
        'not.enough.characters',
        'Comment is too short',
      );
    }

    const createdAt = new Date();

    if (username) {
      return Comments.insert({
        username,
        createdAt,
        content,
        newsId,
        parentId,
      });
    }

    const authorId = Meteor.userId();
    return Comments.insert({
      authorId,
      createdAt,
      content,
      newsId,
      parentId,
    });
  },
});

/**
 * Remove comment
 * @param   { String }   commentId  comment id
 * @return  { Boolean }             true if no error
 */
const removeComment = new ValidatedMethod({
  name: 'comment.remove',
  validate: RemoveCommentSchema.validator({ clean: true }),
  run({ commentId }) {
    throwErrorIfNotAdmin();

    const commentToRemove = Comments.findOne({ parentId: commentId });
    if (commentToRemove) {
      Comments.remove({ parentId: commentId });
    }

    return Comments.remove({ _id: commentId });
  },
});

/**
 * Update comment
 * @param   { String }  commentId   comment id
 * @param   { String }  content     comment content
 * @return  { String }              comment
 */
const updateComment = new ValidatedMethod({
  name: 'comment.update',
  validate: UpdateCommentSchema.validator({ clean: true }),
  run({ commentId, content }) {
    throwErrorIfNotAdmin();

    return Comments.update(commentId, {
      $set: { content },
    });
  },
});

export {
  createComment,
  removeComment,
  updateComment,
};
