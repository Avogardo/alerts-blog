import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { isAdmin } from '/imports/api/users';
import {
  AddNewsSchema,
  NewsIdentitySchema,
  UpdateNewsSchema,
} from './schema.js';
import News from './News.js';

const throwErrorIfNotAdmin = () => {
  if (!isAdmin()) {
    throw new Meteor.Error(
      'create.news.unauthorized',
      'Only redactor is authorized to carry out this operation',
    );
  }
};

/**
 * Create new news
 * @param   { String }  title    news title
 * @param   { String }  content  news content
 * @param   { Array }   images   images (blobs)
 * @param   { Array }   tags     tags (strings)
 * @return  { String }           news
 */
const createNews = new ValidatedMethod({
  name: 'news.add',
  validate: AddNewsSchema.validator({ clean: true }),
  run({
    title,
    content,
    images,
    tags,
  }) {
    throwErrorIfNotAdmin();
    if (images.length > 15) {
      throw new Meteor.Error(
        'too.many.images.uploaded',
        'There is too many images',
      );
    }

    const authorId = Meteor.userId();
    const createdAt = new Date();

    const image = images[0];

    // create a reader according to HTML5 File API
    const reader = new FileReader();

    reader.onload = () => {
      // convert to binary
      const buffer = new Uint8Array(reader.result);

      return News.insert({
        authorId,
        createdAt,
        title,
        content,
        images: buffer,
        tags,
      });
    };

    // read the file as arraybuffer
    reader.readAsArrayBuffer(image);
  },
});

/**
 * Remove news
 * @param   { String }   newsId  news id
 * @return  { Boolean }          true if no error
 */
const removeNews = new ValidatedMethod({
  name: 'news.remove',
  validate: NewsIdentitySchema.validator({ clean: true }),
  run({ newsId }) {
    throwErrorIfNotAdmin();
    return News.remove({ _id: newsId });
  },
});

/**
 * Update news
 * @param   { String }  newsId   news id
 * @param   { String }  title    news title
 * @param   { String }  content  news content
 * @param   { Array }   images   images (blobs)
 * @param   { Array }   tags     tags (strings)
 * @return  { String }           news
 */
const updateNews = new ValidatedMethod({
  name: 'news.update',
  validate: UpdateNewsSchema.validator({ clean: true }),
  run({
    newsId,
    title,
    content,
    images,
    tags,
  }) {
    throwErrorIfNotAdmin();

    return News.update(newsId, {
      $set: {
        title,
        content,
        images,
        tags,
      },
    });
  },
});

export {
  createNews,
  removeNews,
  updateNews,
};
