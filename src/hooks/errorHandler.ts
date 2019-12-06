import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export const errorHandler = (ctx: HookContext) => {
  if (!ctx.error) return;

  if (ctx.error.name === 'ValidationError') {
    ctx.error = new BadRequest(ctx.error.message, ctx.error.errors);
  }

  return ctx;
};
