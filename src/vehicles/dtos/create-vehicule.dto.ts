import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { VehicleType } from '../vehicles.enum';

export class CreateVehicleDto {
  @IsEnum(VehicleType)
  @IsNotEmpty()
  type: VehicleType;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  carryingSpace: number;

  @IsNumber()
  @IsNotEmpty()
  costPerKm: number;

  // Trucks
  @IsNumber()
  @IsOptional()
  maxWeight: number;

  // Vans
  @IsNumber()
  @IsOptional()
  maxItemHeight: number;
}
