import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { IFieldTemplate } from '../../models/fields-templates.model';

export class FieldsTemplates extends Service<IFieldTemplate> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
