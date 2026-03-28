import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';

import { VehiculeType } from '../enums/vehicule-type.enum';

export class CreateVehiculeDto {

    @IsEnum(VehiculeType)
    @IsNotEmpty()
    type: VehiculeType;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsNumber()
    @IsNotEmpty()
    carryingSpace: number;

    @IsNumber()
    @IsNotEmpty()
    costPerKm: number;

    @IsNumber()
    @IsOptional()
    maxWeight: number;

    @IsNumber()
    @IsOptional()
    maxItemHeight: number;
}