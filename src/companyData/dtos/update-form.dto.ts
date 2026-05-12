import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FormStatusEnum } from '../enum/form-status.enum';

export class UpdateFormDto {
  @IsString()
  @IsOptional()
  fullName: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  businessName: string;

  @IsString()
  @IsOptional()
  businessEmail: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  postalCode: string;

  @IsEnum(FormStatusEnum)
  @IsOptional()
  status: FormStatusEnum;
}
