import {
  IsOptional,
  IsBoolean,
  IsNumber,
  IsString,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { TrailerType } from '../enum/trailer-type.enum';
import { TruckType } from '../enum/truck-type.enum';
import { IsLicensePlateValid } from '../validators/license.validator';
import { VehicleType } from '../enum/vehicle-type.enum';

export class UpdateVehicleDto {
  @IsString()
  @IsOptional()
  @IsLicensePlateValid()
  licensePlate: string;

  @IsEnum(VehicleType)
  @IsOptional()
  vehicleType: VehicleType;

  @IsEnum({ ...TruckType, ...TrailerType })
  @ValidateIf((vehicle) => !!vehicle.vehicleType)
  vehicleSubtype: TruckType | TrailerType;

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
