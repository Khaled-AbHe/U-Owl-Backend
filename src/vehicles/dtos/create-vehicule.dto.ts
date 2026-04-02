import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { VehicleType } from '../enum/vehicle-type.enum';

// Changer completement

export class CreateVehicleDto {
  @IsEnum(VehicleType)
  @IsNotEmpty()
  vehicleType: VehicleType;

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
