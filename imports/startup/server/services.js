import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

import _ from 'lodash';

const addServiceConfiguration = (serviceName) => {
  const service = _.get(Meteor.settings, `services[${serviceName}]`, null);
  if (!service) {
    throw new Meteor.Error(
      `missing-settings-${serviceName}`,
      `${serviceName} configurationwas not found`,
    );
  }

  const {
    clientId,
    appId,
    loginStyle,
    secret,
  } = service;

  const config = clientId ? {
    service: serviceName,
    clientId,
    secret,
    loginStyle,
  } : {
    service: serviceName,
    appId,
    secret,
    loginStyle,
  };

  ServiceConfiguration.configurations.upsert({
    service: serviceName,
  }, config);
};

const addServicesConfiguration = () => {
  const { services } = Meteor.settings;
  const servicesList = _.keys(services);

  servicesList.forEach(serviceName => addServiceConfiguration(serviceName));
};

export default addServicesConfiguration;
