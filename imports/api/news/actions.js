import {
  createNews as createNewsMethod,
  removeNews as removeNewsMethod,
  updateNews as updateNewsMethod,
  updateNewsViews as updateNewsViewsMethod,
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
  let location = history.location.pathname.includes('/news/')
    ? newsId
    : `news/${newsId}`;

  if (history.location.pathname.includes('/create-news/')) {
    location = `/news/${newsId}`;
  }

  if (history.location.pathname.includes('/tag/')) {
    location = `/news/${newsId}`;
  }

  if (history.location.pathname !== location) {
    history.push(location);
    window.scrollTo(0, 0);
  }
};

const goToTagSearch = (history, tag = '') => {
  const location = `/tag/${tag}`;
  if (history.location.pathname !== location) {
    history.push(location);
  }
};

const createNews = (
  title,
  content,
  images,
  tags,
  isBreakingNews,
) => new Promise((resolve, reject) => {
  createNewsMethod.call({
    title,
    content,
    images,
    tags,
    isBreakingNews,
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

const updateNews = (
  newsId,
  title,
  content,
  images,
  tags,
  isBreakingNews,
) => new Promise((resolve, reject) => {
  updateNewsMethod.call({
    newsId,
    title,
    content,
    images,
    tags,
    isBreakingNews,
  }, (err, res) => {
    if (err) {
      err = err.reason || err;
      return reject(new Error(err));
    }
    return resolve(res);
  });
});

const updateNewsViews = newsId => new Promise((resolve, reject) => {
  updateNewsViewsMethod.call({ newsId }, (err, res) => {
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
  goToTagSearch,
  createNews,
  removeNews,
  updateNews,
  updateNewsViews,
};

export default actions;
