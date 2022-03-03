import { Injectable } from '@nestjs/common';
import CreateUserDto from '../auth/CreateUserDto';
import { Repository } from 'typeorm';
import User from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return !!user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
