import SimpleSchema from 'simpl-schema';

const CommentsDateSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

const CommentsNewsIdSchema = new SimpleSchema({
  newsId: {
    type: String,
  },
});

const CommentsSchema = new SimpleSchema({
  content: {
    type: String,
  },
  authorId: {
    type: String,
    optional: true,
  },
  parentId: {
    type: String,
    optional: true,
  },
});
CommentsSchema.extend(CommentsDateSchema);
CommentsSchema.extend(CommentsNewsIdSchema);

// method schemas
const AddCommentSchema = new SimpleSchema({});
AddCommentSchema.extend(CommentsSchema);
AddCommentSchema.extend(CommentsNewsIdSchema);

const RemoveCommentSchema = new SimpleSchema({
  commentId: {
    type: String,
  },
});

export { CommentsSchema, AddCommentSchema, RemoveCommentSchema };
