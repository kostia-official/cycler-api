// fields-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';

export default function(app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const fields = new Schema(
    {
      value: { text: { type: String } },
      fieldTemplateId: { type: Schema.Types.ObjectId, ref: 'fieldsTemplates' },
      iterationId: { type: Schema.Types.ObjectId, ref: 'iterations' },
      userId: { type: String, required: true }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('fields', fields);
}

export interface IFields {
  _id: string;
  value: any;
  iterationId: string;
  fieldTemplateId: string;
}
