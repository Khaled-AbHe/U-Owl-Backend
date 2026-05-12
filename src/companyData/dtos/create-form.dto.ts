import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FormStatusEnum } from '../enum/form-status.enum';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsString()
  @IsNotEmpty()
  businessEmail: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsEnum(FormStatusEnum)
  @IsNotEmpty()
  status: FormStatusEnum;
}
