import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Cycle } from './cycles.class';
import createModel from '../../models/cycles.model';
import hooks from './cycles.hooks';

declare module '../../declarations' {
  interface ServiceTypes {
    cycles: Cycle & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const options = {
    Model: createModel(app),
    ...app.get('modelOptions')
  };

  // Initialize our service with any options it requires
  app.use('/cycles', new Cycle(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cycles');

  service.hooks(hooks);
}
