import { Meteor } from 'meteor/meteor';

export const isLoggedIn = () => !!Meteor.userId();
