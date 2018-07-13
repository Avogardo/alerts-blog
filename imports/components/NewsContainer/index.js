import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import { News as NewsCollection } from '/imports/api/news';
import NewsContainer from './NewsContainer.jsx';

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
  const topNewsHandler = Meteor.subscribe('recentNewsWithLimit');

  if (topNewsHandler) {
    const topNews = NewsCollection.find().fetch();
    console.log(topNews);

    onData(null, {
      topNews,
    });
  }

  onData(null, {});
};

export default compose(getTrackerLoader(composer))(NewsContainer);
