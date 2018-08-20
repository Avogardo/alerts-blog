import News from './News';

const removeOldBreakingNewsIfExists = (isBreakingNews) => {
  if (isBreakingNews) {
    News.update({ isBreakingNews: true }, {
      $set: {
        isBreakingNews: false,
      },
    });
  }
};

export { removeOldBreakingNewsIfExists };
