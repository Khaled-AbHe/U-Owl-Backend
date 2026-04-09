import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { UserType } from '../enums/users.enum';
import { AdminType } from '../enums/admin-type.enum';

export class CreateUserDto {
  @IsEnum(UserType)
  @IsNotEmpty()
  userType!: UserType;

  @IsEnum(AdminType)
  @ValidateIf((user) => user.userType === UserType.ADMIN)
  adminType: AdminType;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
