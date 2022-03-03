import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateUserDto from './CreateUserDto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import UserSignInDTO from './UserSignInDTO';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Body() body: UserSignInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(body);
    if (!user) {
      res.status(HttpStatus.NOT_FOUND);
      return {
        data: null,
        error: { message: 'Invalid username or password' },
      };
    }

    return {
      data: {
        token: await this.authService.signInUser(user),
        user,
      },
      error: null,
    };
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const registerUser = await this.authService.registerUser(body);

    if (!registerUser) {
      res.status(HttpStatus.BAD_REQUEST);
      return {
        data: null,
        error: { message: 'User already exists' },
      };
    }

    res.status(HttpStatus.CREATED);
    return {
      data: {
        token: await this.authService.signInUser(registerUser),
        user: registerUser,
      },
      error: null,
    };
  }
}
