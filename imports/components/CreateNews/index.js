import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import { Tracker } from 'meteor/tracker';
import {
  actions as newsActions,
  News as NewsCollection,
} from '../../api/news';
import CreateNews from './CreateNews.jsx';

const getTrackerLoader = composer =>
  (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() =>
      Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = composer(props, onData, env);
      }));

    return () => {
      if (typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };

const composer = (props, onData) => {
  const newsId = props.match.params.id;
  const { createNews, updateNews, goToNews } = newsActions;

  if (newsId) {
    const newsHandler = Meteor.subscribe('singleNews', newsId, true, true);
    if (newsHandler.ready()) {
      const news = NewsCollection.find({ _id: newsId }).fetch()[0];

      onData(null, {
        news,
        createNews,
        updateNews,
        goToNews,
        ...props,
      });
    }
  } else {
    onData(null, {
      createNews,
      updateNews,
      goToNews,
      ...props,
    });
  }
};

export default compose(getTrackerLoader(composer))(CreateNews);
