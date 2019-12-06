import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { IFields } from '../../models/fields.model';

export class Fields extends Service<IFields> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
