import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './CreateUserDto';
import UserService from '../users/user.service';
import User from '../entity/user.entity';
import * as jwt from 'jsonwebtoken';
import UserSignInDTO from './UserSignInDTO';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(data: UserSignInDTO): Promise<User | null> {
    const user = await this.userService.getUserByEmail(data.email);
    if (!user) return null;
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (!checkPassword) return null;

    return user;
  }

  async registerUser(user: CreateUserDto): Promise<User | null> {
    const userExists = await this.userService.checkEmail(user.email);
    if (userExists) {
      return null;
    }

    const hashedPassword = await AuthService.hashPassword(user.password);
    return await this.userService.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  private static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async signInUser(user: User) {
    return jwt.sign({ ...user }, 'secret');
  }
}
