import { HookContext } from '@feathersjs/feathers';
import { NotAuthenticated } from '@feathersjs/errors';
import { getUserId } from '../helpers/getUserId';

export const includeUserId = () => (context: HookContext) => {
  const userId = getUserId(context);
  if (!userId) throw new NotAuthenticated('No user id in JWT.');

  if (context.data) {
    context.data.userId = userId;
  }

  if (context.params.query) {
    context.params.query.userId = userId;
  }

  return context;
};
