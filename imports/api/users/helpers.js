import { Meteor } from 'meteor/meteor';
import { actions as newsActions } from '../news';

const isAdmin = (userId) => {
  const user = userId ?
    Meteor.users.findOne(userId)
    :
    Meteor.user();
  return !!(user && !!user.isAdmin);
};

const isLoggedIn = () => !!Meteor.userId();

const onLogOut = history => Meteor.logout(() => {
  newsActions.goToNewsContainer(history);
});

export {
  isAdmin,
  isLoggedIn,
  onLogOut,
};
