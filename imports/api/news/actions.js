import { createNews as createNewsMethod } from './methods.js';

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

const actions = {
  goToNewsContainer,
  createNews,
};

export default actions;
