import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password should be greater than 8',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, {
    message: 'Name should be greater than 1',
  })
  name: string;
}
