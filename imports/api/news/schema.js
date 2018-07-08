import SimpleSchema from 'simpl-schema';

const NewsContentSchema = new SimpleSchema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});

const NewsImagesSchema = new SimpleSchema({
  images: {
    type: Array,
    defaultValue: [],
  },
  'images.$': {
    type: String,
  },
});

const NewsTagsSchema = new SimpleSchema({
  tags: {
    type: Array,
    defaultValue: [],
  },
  'tags.$': {
    type: String,
  },
});

const NewsSchema = new SimpleSchema({
  authorId: {
    type: String,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});
NewsSchema.extend(NewsContentSchema);
NewsSchema.extend(NewsImagesSchema);
NewsSchema.extend(NewsTagsSchema);

// method schemas
const AddNewsSchema = new SimpleSchema({});
AddNewsSchema.extend(NewsContentSchema);
AddNewsSchema.extend(NewsImagesSchema);
AddNewsSchema.extend(NewsTagsSchema);

export {
  NewsSchema,
  AddNewsSchema,
};