import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserType } from '../users.enum';

export class CreateUserDto {
  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
