import { compose } from 'react-komposer';
import BasicNews from './BasicNews.jsx';

const composer = (props, onData) => {
  const { topNews, unit8ArrayToUrl } = props;
  if (props.newsCard && topNews && topNews[0] && topNews[0].images) {
    topNews[0].imagesFroSlider = topNews[0].images.data.map(photo => ({
      original: unit8ArrayToUrl(photo.image),
      thumbnail: unit8ArrayToUrl(photo.image),
    }));

    onData(null, {
      ...props,
      topNews,
    });
  } else {
    onData(null, {
      ...props,
    });
  }
};

export default compose(composer)(BasicNews);
