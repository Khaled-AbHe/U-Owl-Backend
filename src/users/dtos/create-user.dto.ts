import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserType } from '../enums/users.enum';

export class CreateUserDto {
  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
