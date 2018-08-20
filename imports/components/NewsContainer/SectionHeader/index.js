import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import { News } from '/imports/api/news';
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
      const headerTitle = News.find({ isBreakingNews: true }, options).fetch()[0].title;

      onData(null, {
        ...props,
        headerTitle,
      });
    } else {
      onData(null, {
        ...props,
      });
    }
  } else {
    onData(null, {
      ...props,
    });
  }
};

export default compose(getTrackerLoader(composer))(SectionHeader);
