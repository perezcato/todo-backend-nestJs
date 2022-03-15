import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import RequestWithUser from '../auth/RequestWithUser';
import User from '../entity/user.entity';
import { Reflector } from '@nestjs/core';

@Injectable()
export default class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest() as RequestWithUser;
    const user = request['user'] as User;

    let canRole = false;

    for (const i of roles) {
      //@ts-ignore
      const isTrue = user.roles.find((role) => role.role === i);
      canRole = !!isTrue;
    }

    return canRole;
  }
}
