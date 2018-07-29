import SimpleSchema from 'simpl-schema';

const CommentsDateSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

const CommentsSchema = new SimpleSchema({
  content: {
    type: String,
  },
  newsId: {
    type: String,
  },
  authorId: {
    type: String,
    optional: true,
  },
});
CommentsSchema.extend(CommentsDateSchema);

// method schemas
const AddCommentSchema = new SimpleSchema({});
AddCommentSchema.extend(CommentsSchema);

export { CommentsSchema, AddCommentSchema };
