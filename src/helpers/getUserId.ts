import { HookContext } from '@feathersjs/feathers';

export const getUserId = (context: HookContext) => context.params?.user?.sub;
