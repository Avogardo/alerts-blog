import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import { News, actions as newsActions } from '/imports/api/news';
import SectionHeader from './SectionHeader.jsx';

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
  if (props.breakingNews) {
    const newsHandler = Meteor.subscribe('breakingNews');

    if (newsHandler.ready()) {
      const options = {
        fields: {
          title: 1,
        },
      };
      const breakingNewsData = News.find({ isBreakingNews: true }, options).fetch()[0];

      onData(null, {
        ...props,
        breakingNewsData,
        goToNews: newsActions.goToNews,
      });
    } else {
      onData(null, {
        ...props,
        goToNews: newsActions.goToNews,
      });
    }
  } else {
    onData(null, {
      ...props,
      goToNews: newsActions.goToNews,
    });
  }
};

export default compose(getTrackerLoader(composer))(SectionHeader);
