import mongoose from 'mongoose';
import { Application } from '../declarations';
const { Mixed, ObjectId } = mongoose.Schema.Types;

export default function(app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const fieldsTemplates = new Schema(
    {
      _id: { type: ObjectId, auto: true },
      type: { type: String, required: true },
      name: { type: String, required: true },
      typeMeta: { type: Mixed },
      userId: { type: String, required: true }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('fieldsTemplates', fieldsTemplates);
}

export interface IFieldTemplate {
  _id: string;
  type: FieldType;
  name: string;
  typeMeta?: any;
}

export enum FieldType {
  Text = 'text',
  Select = 'select'
}
