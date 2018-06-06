import { compose } from 'react-komposer';
import NewsContainer from './NewsContainer.jsx';

const composer = (props, onData) => {
  const newsArray = [];

  onData(null, {
    newsArray,
  });
};

export default compose(
  composer,
)(NewsContainer);
