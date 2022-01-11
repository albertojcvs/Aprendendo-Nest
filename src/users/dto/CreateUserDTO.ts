import { InputType, Field} from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';
@InputType()
export class CreateUserDTO {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
