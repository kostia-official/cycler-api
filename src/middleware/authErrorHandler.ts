import { Request, Response, NextFunction, Errback } from 'express';

export const authErrorHandler = function(
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
  next();
};
