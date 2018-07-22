import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { compose } from 'react-komposer';
import { isLoggedIn, isAdmin } from '../../api/users';
import MainLayout from './MainLayout.jsx';

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
  const userHandler = Meteor.subscribe('extendedUser');
  const isLoggedInUser = isLoggedIn();
  const isAuthorized = isAdmin();

  if (userHandler.ready()) {
    onData(null, {
      isLoggedInUser,
      isAuthorized,
      ...props,
    });
  }
};

export default compose(getTrackerLoader(composer))(MainLayout);
