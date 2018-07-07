import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

const setAdminOnFirstUser = (options, user) => {
  if (Meteor.users.find({}).count() > 0) {
    user.isAdmin = false;
  } else {
    user.isAdmin = true;
  }
  return user;
};

const saveUserProfile = (options, user) => {
    const profile = (options && options.profile) || {};
    user.profile = profile;
    return user;
};

Accounts.onCreateUser((options, user) => {
  user = setAdminOnFirstUser(options, user);
  user = saveUserProfile(options, user);
  return user;
});
