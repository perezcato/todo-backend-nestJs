import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decodeJwt } from '../helpers';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED);
      return res.json({
        data: null,
        error: { message: 'unauthorized' },
      });
    }

    try {
      await decodeJwt(token);
    } catch (e) {
      res.status(HttpStatus.UNAUTHORIZED);
      return res.json({
        data: null,
        error: { message: 'Invalid Token' },
      });
    }

    return next();
  }
}
