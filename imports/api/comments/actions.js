import {
  createComment as createCommentMethod,
  removeComment as removeCommentMethod,
  updateComment as updateCommentMethod,
} from './methods.js';

const createComment = (content, newsId, parentId) => new Promise((resolve, reject) => {
  createCommentMethod.call({
    content,
    newsId,
    parentId,
  }, (err, res) => {
    if (err) {
      err = err.reason || err;
      return reject(new Error(err));
    }
    return resolve(res);
  });
});

const removeComment = commentId => new Promise((resolve, reject) => {
  removeCommentMethod.call({ commentId }, (err, res) => {
    if (err) {
      err = err.reason || err;
      return reject(new Error(err));
    }
    return resolve(res);
  });
});

const updateComment = (commentId, content) => new Promise((resolve, reject) => {
  updateCommentMethod.call({
    commentId,
    content,
  }, (err, res) => {
    if (err) {
      err = err.reason || err;
      return reject(new Error(err));
    }
    return resolve(res);
  });
});

const actions = {
  createComment,
  removeComment,
  updateComment,
};

export default actions;
