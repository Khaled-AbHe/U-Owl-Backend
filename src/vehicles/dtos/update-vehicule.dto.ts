import {
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class UpdateVehicleDto {
  @IsNumber()
  @IsOptional()
  kilometrage: number;
  
  @IsNumber()
  @IsOptional()
  costPerKm: number;
  
  @IsBoolean()
  @IsOptional()
  isReserved: boolean;
  
  @IsBoolean()
  @IsOptional()
  isSafe: boolean;
}
