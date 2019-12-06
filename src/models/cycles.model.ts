import { Application } from '../declarations';
import { IFieldTemplate } from './fields-templates.model';

export default function(app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const cycle = new Schema(
    {
      name: { type: String, required: true },
      periodicity: { type: String, required: true },
      fieldsTemplates: [{ type: Schema.Types.ObjectId, ref: 'fieldsTemplates' }],
      userId: { type: String, required: true }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('cycles', cycle);
}

export enum Periodicity {
  Day = 'day',
  Week = 'week',
  Month = 'month'
}

export interface ICycle {
  _id: string;
  name: string;
  periodicity: Periodicity;
  fieldsTemplates: string[];
}

export interface ICyclePopulated {
  _id: string;
  name: string;
  periodicity: Periodicity;
  fieldsTemplates: IFieldTemplate[];
}
