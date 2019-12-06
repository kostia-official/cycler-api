// Initializes the `fields` service on path `/fields`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Fields } from './fields.class';
import createModel from '../../models/fields.model';
import hooks from './fields.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'fields': Fields & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    ...app.get('modelOptions')
  };

  // Initialize our service with any options it requires
  app.use('/fields', new Fields(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('fields');

  service.hooks(hooks);
}
