import _ from 'lodash';
import { acl } from '../acl';
import { checkJwt } from './checkJwt';
import { Application } from '@feathersjs/feathers';
import { Request, Response, NextFunction } from 'express';

export const configureAcl = (app: Application) => {
  if (process.env.NODE_ENV === 'test') return;

  _.forEach(acl, ({ route, methods, allow }) => {
    app.use(route, (req: Request, res: Response, next: NextFunction) => {
      if (!methods.includes(req.method)) return next();

      if (allow.isAuthenticated) {
        return checkJwt(req, res, next);
      }

      return next();
    });
  });
};
