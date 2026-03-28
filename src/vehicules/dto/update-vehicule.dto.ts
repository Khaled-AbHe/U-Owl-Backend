import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';

import { VehiculeType } from '../enums/vehicule-type.enum';

export class UpdateVehiculeDto {

    @IsEnum(VehiculeType)
    @IsOptional()
    type: VehiculeType;

    @IsString()
    @IsOptional()
    model: string;

    @IsNumber()
    @IsOptional()
    carryingSpace: number;

    @IsNumber()
    @IsOptional()
    costPerKm: number;

    @IsNumber()
    @IsOptional()
    maxWeight: number;

    @IsNumber()
    @IsOptional()
    maxItemHeight: number;
}