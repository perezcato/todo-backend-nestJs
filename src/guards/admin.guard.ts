import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import RequestWithUser from '../auth/RequestWithUser';
import User from '../entity/user.entity';

@Injectable()
export default class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as RequestWithUser;
    const user = request['user'] as User;
    return user.admin;
  }
}
