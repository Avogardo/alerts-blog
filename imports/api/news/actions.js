import {
  createNews as createNewsMethod,
  removeNews as removeNewsMethod,
} from './methods.js';

const goToNewsContainer = (history) => {
  const location = '/';
  if (history.location.pathname !== location) {
    history.push(location);
  }
};

const createNews = (title, content, images, tags) => new Promise((resolve, reject) => {
  createNewsMethod.call({
    title,
    content,
    images,
    tags,
  }, (err, res) => {
    if (err) {
      err = err.reason || err;
      return reject(new Error(err));
    }
    return resolve(res);
  });
});

const removeNews = newsId => new Promise((resolve, reject) => {
  removeNewsMethod.call({ newsId }, (err, res) => {
    if (err) {
      err = err.reason || err;
      return reject(new Error(err));
    }
    return resolve(res);
  });
});

const actions = {
  goToNewsContainer,
  createNews,
  removeNews,
};

export default actions;
