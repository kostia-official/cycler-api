import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { ICycle } from '../../models/cycles.model';

export class Cycle extends Service<ICycle> {
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
