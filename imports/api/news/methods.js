import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { isAdmin } from '/imports/api/users';
import { Comments } from '../comments';
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
 * @param   { String }   title           news title
 * @param   { String }   content         news content
 * @param   { Array }    images          images (blobs)
 * @param   { Array }    tags            tags (strings)
 * @param   { Boolean }  isBreakingNews  is breaking news
 * @return  { String }                   news
 */
const createNews = new ValidatedMethod({
  name: 'news.add',
  validate: AddNewsSchema.validator({ clean: true }),
  run({
    title,
    content,
    images,
    tags,
    isBreakingNews,
  }) {
    throwErrorIfNotAdmin();
    if (images.data.length > 15) {
      throw new Meteor.Error(
        'too.many.images.uploaded',
        'There is too many images',
      );
    } else if (title.length < 3) {
      throw new Meteor.Error(
        'not.enought.characters',
        'Title is too short',
      );
    } else if (content.length < 15) {
      throw new Meteor.Error(
        'not.enought.characters',
        'Article is too short',
      );
    }

    const authorId = Meteor.userId();
    const createdAt = new Date();
    const enterImage = images.data[0];

    return News.insert({
      authorId,
      createdAt,
      title,
      content,
      images,
      enterImage: { data: enterImage },
      tags,
      isBreakingNews,
    });
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
    Comments.remove({ newsId });
    return News.remove({ _id: newsId });
  },
});

/**
 * Update news
 * @param   { String }   newsId          news id
 * @param   { String }   title           news title
 * @param   { String }   content         news content
 * @param   { Array }    images          images (blobs)
 * @param   { Array }    tags            tags (strings)
 * @param   { Boolean }  isBreakingNews  is breaking news
 * @return  { String }                   news
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
    isBreakingNews,
  }) {
    throwErrorIfNotAdmin();

    const enterImage = images.data[0];
    return News.update(newsId, {
      $set: {
        title,
        content,
        images,
        enterImage: { data: enterImage },
        tags,
        isBreakingNews,
      },
    });
  },
});

const updateNewsViews = new ValidatedMethod({
  name: 'news.views.update',
  validate: NewsIdentitySchema.validator({ clean: true }),
  run({ newsId }) {
    const query = { _id: newsId };
    const options = {
      fields: {
        views: 1,
      },
    };
    const views = News.findOne(query, options).views + Math.floor((Math.random() * 15) + 1);

    return News.update(newsId, {
      $set: {
        views,
      },
    });
  },
});

export {
  createNews,
  removeNews,
  updateNews,
  updateNewsViews,
};
