import { Meteor } from 'meteor/meteor';
import { actions as newsActions } from '../news';

export const isLoggedIn = () => !!Meteor.userId();

export const onLogOut = history => Meteor.logout(() => {
  newsActions.goToNewsContainer(history);
});
