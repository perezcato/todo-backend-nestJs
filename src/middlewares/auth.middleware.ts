import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decodeJwt } from '../helpers';
import UserService from '../users/user.service';
import User from '../entity/user.entity';
import RequestWithUser from '../auth/RequestWithUser';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED);
      return res.json({
        data: null,
        error: { message: 'unauthorized' },
      });
    }

    try {
      const decodedToken = (await decodeJwt(token)) as User;
      const user = await this.userService.getUserByEmail(
        decodedToken.email as string,
      );
      if (!user) {
        res.status(HttpStatus.UNAUTHORIZED);
        return res.json({
          data: null,
          error: { message: 'Invalid Token' },
        });
      }

      req.user = user;
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
