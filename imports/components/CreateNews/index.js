import { compose } from 'react-komposer';
import { actions as newsActions } from '../../api/news';
import CreateNews from './CreateNews.jsx';

const composer = (props, onData) => {
  onData(null, {
    createNews: newsActions.createNews,
    ...props,
  });
};

export default compose(composer)(CreateNews);
