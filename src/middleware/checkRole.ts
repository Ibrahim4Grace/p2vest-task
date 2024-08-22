import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { Forbidden } from './error';

export const checkRole =
  (roles: Array<string>) =>
  (req: Request & { user?: User }, res: Response, next: NextFunction) => {
    const user = req.user;

    const hasRole = user?.role.some((r) => roles.includes(r));

    if (!hasRole) {
      return next(
        new Forbidden('You do not have permission to access this resource')
      );
    }
    next();
  };
