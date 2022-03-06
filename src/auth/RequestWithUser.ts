import { Request } from 'express';
import User from '../entity/user.entity';

export default interface RequestWithUser extends Request {
  user: User;
}
