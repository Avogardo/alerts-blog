import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import md5 from 'md5';

const setAdminOnFirstUser = (options, user) => {
  user.isAdmin = Meteor.users.find({}).count() === 0;
  return user;
};

const saveUserProfile = (options, user) => {
  user.profile = (options && options.profile) || {};
  return user;
};

const getAvatarUrl = (user) => {
  let avatar;
  if (user.services.google) {
    avatar = user.services.google.picture;
  } else if (user.services.facebook) {
    avatar = `http://graph.facebook.com/${user.services.facebook.id}/picture/?type=large`;
  }

  if (avatar) {
    return avatar;
  }

  const emailHash = md5((user.services.google || user.services.facebook).email);
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
    return [{
      address: user.services.google.email,
      verified: user.services.google.verified_email,
    }];
  } else if (user.services.facebook) {
    return [{
      address: user.services.facebook.email,
      verified: user.services.facebook.verified_email,
    }];
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
