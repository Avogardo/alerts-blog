import SimpleSchema from 'simpl-schema';

const CommentsDateAuthorSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
  authorId: {
    type: String,
    optional: true,
  },
  username: {
    type: String,
    optional: true,
  },
});

const CommentsContentSchema = new SimpleSchema({
  content: {
    type: String,
  },
});

const CommentsSchema = new SimpleSchema({
  newsId: {
    type: String,
  },
  parentId: {
    type: String,
    optional: true,
  },
});
CommentsSchema.extend(CommentsDateAuthorSchema);
CommentsSchema.extend(CommentsContentSchema);

// method schemas
const AddCommentSchema = new SimpleSchema({});
AddCommentSchema.extend(CommentsSchema);
AddCommentSchema.extend(CommentsContentSchema);

const RemoveCommentSchema = new SimpleSchema({
  commentId: {
    type: String,
  },
});

const UpdateCommentSchema = new SimpleSchema({});
UpdateCommentSchema.extend(RemoveCommentSchema);
UpdateCommentSchema.extend(CommentsContentSchema);

export {
  CommentsSchema,
  AddCommentSchema,
  RemoveCommentSchema,
  UpdateCommentSchema,
};
