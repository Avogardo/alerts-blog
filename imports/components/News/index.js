import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import { News as NewsCollection } from '/imports/api/news';
import News from './News.jsx';

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
  const newsHandler = Meteor.subscribe('singleNews', newsId);

  const unit8ArrayToUrl = (image) => {
    const blob = new Blob([image], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  };

  if (newsHandler.ready()) {
    const news = NewsCollection.find({ _id: newsId }).fetch();

    onData(null, {
      news,
      unit8ArrayToUrl,
    });
  }
};

export default compose(getTrackerLoader(composer))(News);
