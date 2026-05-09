import {
  IsEmail,
  IsString,
  IsOptional,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { AdminType } from '../enums/admin-type.enum';
import { UserType } from '../enums/users.enum';

export class UpdateUserDto {
  @IsEnum(UserType)
  @IsOptional()
  userType: UserType;

  @IsEnum(AdminType)
  @ValidateIf((user) => user.userType === UserType.ADMIN)
  adminType: AdminType;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
