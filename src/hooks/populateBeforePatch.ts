import { HookContext } from '@feathersjs/feathers';
import _ from 'lodash';

interface IPopulateCreatedParams {
  fieldInMain: string;
  relatedService: string;
}

export const populateBeforePatch = ({
  relatedService,
  fieldInMain
}: IPopulateCreatedParams) => async (context: HookContext) => {
  const service = context.app.service(relatedService);

  const relatedDataResult = await Promise.all(
    _.map(context.data[fieldInMain], (record) => {
      return record._id
        ? service.patch(record._id, record, context.params)
        : service.create(record, context.params);
    })
  );

  context.data = { ...context.data, [fieldInMain]: _.map(relatedDataResult, '_id') };

  return context;
};
