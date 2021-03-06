import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
