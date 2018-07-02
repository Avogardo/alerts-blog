import { Meteor } from 'meteor/meteor';
import addServicesConfiguration from './services.js';

Meteor.startup(() => {
  // code to run on server at startup
  addServicesConfiguration();
});
