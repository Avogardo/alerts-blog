import { compose } from 'react-komposer';
import NewsContainer from './NewsContainer.jsx';

const composer = (props, onData) => {
  const newsArray = [1];

  onData(null, {
    newsArray,
  });
};

export default compose(composer)(NewsContainer);
