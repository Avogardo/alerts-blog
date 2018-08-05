import {
  createNews as createNewsMethod,
  removeNews as removeNewsMethod,
  updateNews as updateNewsMethod,
} from './methods.js';

const goToNewsContainer = (history) => {
  const location = '/';
  if (history.location.pathname !== location) {
    history.push(location);
  }
};

const goToCreateNews = (history, newsId) => {
  const location = newsId ? `/create-news/${newsId}` : '/create-news';
  if (history.location.pathname !== location) {
    history.push(location);
  }
};

const goToNews = (history, newsId) => {
  const location = history.location.pathname.includes('/news/')
    ? newsId
    : `news/${newsId}`;

  if (history.location.pathname !== location) {
    history.push(location);
    window.scrollTo(0, 0);
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

const updateNews = (newsId, title, content, images, tags) => new Promise((resolve, reject) => {
  updateNewsMethod.call({
    newsId,
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

const actions = {
  goToNewsContainer,
  goToCreateNews,
  goToNews,
  createNews,
  removeNews,
  updateNews,
};

export default actions;
