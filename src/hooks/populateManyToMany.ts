import { HookContext } from '@feathersjs/feathers';

interface IPopulateCreatedParams {
  mainTable: string;
  relatedTable: string;
}

export const populateManyToMany = ({ mainTable, relatedTable }: IPopulateCreatedParams) => async (
  context: HookContext
) => {
  const mongoose = context.app.get('mongooseClient');
  const result = await mongoose
    .model(mainTable)
    .findOne({ _id: context.result._id })
    .populate(relatedTable);

  context.result = result;

  return context;
};
