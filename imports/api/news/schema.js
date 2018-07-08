import SimpleSchema from 'simpl-schema';

export const NewsSchema = new SimpleSchema({
	title: {
    type: String,
	},
  content: {
    type: String,
  },
  authorId: {
    type: String,
  },
  images: {
    type: Array,
    defaultValue: [],
  }
  tags: {
    type: Array,
    defaultValue: [],
  }
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});
