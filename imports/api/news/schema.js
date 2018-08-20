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
    type: Object,
    optional: true,
    blackbox: true,
    defaultValue: {},
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
  isBreakingNews: {
    type: Boolean,
    defaultValue: false,
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
  enterImage: {
    type: Object,
    optional: true,
    blackbox: true,
    defaultValue: {},
  },
  views: {
    type: Number,
    defaultValue: 0,
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

const NewsIdentitySchema = new SimpleSchema({
  newsId: {
    type: String,
  },
});

const UpdateNewsSchema = new SimpleSchema({});
UpdateNewsSchema.extend(AddNewsSchema);
UpdateNewsSchema.extend(NewsIdentitySchema);

export {
  NewsSchema,
  AddNewsSchema,
  NewsIdentitySchema,
  UpdateNewsSchema,
};
