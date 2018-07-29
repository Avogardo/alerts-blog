import SimpleSchema from 'simpl-schema';

const CommentsDateSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

const CommentsContentSchema = new SimpleSchema({
  content: {
    type: String,
  },
});

const CommentsSchema = new SimpleSchema({
  authorId: {
    type: String,
    optional: true,
  },
  newsId: {
    type: String,
  },
  parentId: {
    type: String,
    optional: true,
  },
});
CommentsSchema.extend(CommentsDateSchema);
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
