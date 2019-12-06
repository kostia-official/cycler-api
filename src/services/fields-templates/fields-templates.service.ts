// Initializes the `fieldsTemplates` service on path `/fields-templates`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FieldsTemplates } from './fields-templates.class';
import createModel from '../../models/fields-templates.model';
import hooks from './fields-templates.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    fieldsTemplates: FieldsTemplates & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const options = {
    Model: createModel(app),
    ...app.get('modelOptions')
  };

  // Initialize our service with any options it requires
  app.use('/fieldsTemplates', new FieldsTemplates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('fieldsTemplates');

  service.hooks(hooks);
}
