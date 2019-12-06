import { HookContext } from '@feathersjs/feathers';
import _ from 'lodash';

interface IPopulateCreatedParams {
  fieldInMain: string;
  relatedService: string;
}

export const populateBeforeCreate = ({
  relatedService,
  fieldInMain
}: IPopulateCreatedParams) => async (context: HookContext) => {
  const relatedDataResult = await Promise.all(
    _.map(context.data[fieldInMain], (item) => {
      return context.app.service(relatedService).create(item, context.params);
    })
  );

  context.data = { ...context.data, [fieldInMain]: _.map(relatedDataResult, '_id') };

  return context;
};
