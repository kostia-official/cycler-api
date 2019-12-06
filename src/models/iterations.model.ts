import { Application } from '../declarations';
import { IFields } from './fields.model';

export default function(app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const iterations = new Schema(
    {
      date: { type: Date, required: true },
      cycleId: { type: Schema.Types.ObjectId, ref: 'cyclesTemplates' },
      userId: { type: String, required: true }
    },
    {
      timestamps: true,
      toJSON: { virtuals: true }
    }
  );

  iterations.virtual('fields', {
    ref: 'fields',
    localField: '_id',
    foreignField: 'iterationId'
  });

  return mongooseClient.model('iterations', iterations);
}

export interface IIteration {
  _id: string;
  date: Date;
  fields: string[];
  cycleId: string;
}

export interface IIterationPopulated {
  _id: string;
  date: Date;
  fields: IFields[];
  cycleId: string;
}
