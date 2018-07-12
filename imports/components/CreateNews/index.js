import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import { actions as newsActions } from '../../api/news';
import CreateNews from './CreateNews.jsx';

const composer = (props, onData) => {
  const createNews = (
    title,
    content,
    files,
    tags,
  ) => {
    newsActions.createNews(
      title,
      content,
      files,
      tags,
    ).then(() => console.log('success'))
      .catch((error) => {
        onData(null, {
          createNews,
          error,
          ...props,
        });
      });
  };

  onData(null, {
    createNews,
    ...props,
  });
};

export default compose(composer)(CreateNews);
