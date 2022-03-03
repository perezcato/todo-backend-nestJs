import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class UserSignInDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
