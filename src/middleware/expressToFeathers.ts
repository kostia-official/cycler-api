import { NextFunction, Response } from 'express';

export const expressToFeathers = function(req: any, res: Response, next: NextFunction) {
  req.feathers.user = req.user;
  next();
};
