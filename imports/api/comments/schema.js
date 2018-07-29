import SimpleSchema from 'simpl-schema';

const CommentsSchema = new SimpleSchema({
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
  newsId: {
    type: String,
  },
  authorId: {
    type: String,
    optional: true,
  },
});

export { CommentsSchema };
