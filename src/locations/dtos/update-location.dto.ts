import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  depotName: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsNumber()
  @IsOptional()
  lon: number;

  @IsNumber()
  @IsOptional()
  lat: number;

  @IsString()
  @IsOptional()
  phoneNumber: string;
}
