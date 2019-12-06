import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Iterations } from './iterations.class';
import createModel from '../../models/iterations.model';
import hooks from './iterations.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    iterations: Iterations & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const options = {
    Model: createModel(app),
    ...app.get('modelOptions')
  };

  // Initialize our service with any options it requires
  app.use('/iterations', new Iterations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('iterations');

  service.hooks(hooks);
}
