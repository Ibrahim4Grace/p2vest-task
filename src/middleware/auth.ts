import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../models';
import log from '../utils/logger';
import { ServerError } from './error';
import { JwtPayload } from '../types';
import { UserRole } from '../models';

export const authMiddleware = async (
  req: Request & { user?: { user_id: string; role: UserRole[] } },
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status_code: '401',
        message: 'Invalid token',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status_code: '401',
        message: 'Invalid token',
      });
    }

    jwt.verify(token, config.TOKEN_SECRET, async (err, decoded) => {
      if (err || !decoded) {
        return res.status(401).json({
          status_code: '401',
          message: 'Invalid token',
        });
      }

      const { userId } = decoded as JwtPayload;

      const user = await User.findOne({
        where: { id: userId },
      });
      if (!user) {
        return res.status(401).json({
          status_code: '401',
          message: 'Invalid token',
        });
      }

      req.user = {
        email: user.email,
        user_id: user.id,
        role: user.role,
      };

      console.log(user);

      next();
    });
  } catch (error) {
    log.error(error);
    throw new ServerError('INTERNAL_SERVER_ERROR');
  }
};
