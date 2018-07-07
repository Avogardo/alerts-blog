import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import md5 from 'md5';

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

const getAvatarUrl = (user) => {
  const googleAvatar = user.services.google.picture;

  if (googleAvatar) {
    return googleAvatar;
  }

  const emailHash = md5(user.services.google.email);
  return `https://s.gravatar.com/avatar/${emailHash}`;
};

const setUserAvatar = (options, user) => {
  if (user && user.profile && !user.profile.avatar) {
    user.profile.avatar = getAvatarUrl(user);
  }
  return user;
};

const getPublicEmail = (user) => {
  if (user.services.google) {
    const googleEmail = [{
      address: user.services.google.email,
      verified: user.services.google.verified_email,
    }];

    return googleEmail;
  }

  return undefined;
};

const setPublicEmail = (options, user) => {
  if (user && !user.emails && getPublicEmail(user)) {
    user.emails = getPublicEmail(user);
  }

  return user;
};

Accounts.onCreateUser((options, user) => {
  user = setAdminOnFirstUser(options, user);
  user = saveUserProfile(options, user);
  user = setUserAvatar(options, user);
  user = setPublicEmail(options, user);
  
  return user;
});
