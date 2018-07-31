import { Meteor } from 'meteor/meteor';

Meteor.publish('extendedUser', function publishExtendedUser() {
  const { userId } = this;

  if (!userId) {
    this.ready();
  }

  return Meteor.users.find({
    _id: userId,
  }, {
    fields: {
      profile: 1,
      isAdmin: 1,
    },
  });
});

Meteor.publish('userList', function publishUserList() {
  const options = {
    fields: {
      'profile.name': 1,
      'profile.avatar': 1,
    },
  };

  return Meteor.users.find({}, options);
});
