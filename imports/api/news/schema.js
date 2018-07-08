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
  },
  'images.$': {
    type: String,
  },
  tags: {
    type: Array,
    defaultValue: [],
  },
  'tags.$': {
    type: String,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

// method schemas
export const AddNewsSchema = new SimpleSchema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  images: {
    type: Array,
    defaultValue: [],
  },
  'images.$': {
    type: String,
  },
  tags: {
    type: Array,
    defaultValue: [],
  },
  'tags.$': {
    type: String,
  },
});
