import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  isNumber,
  IsBoolean,
} from 'class-validator';
import { TrailerType } from '../enum/trailer-type.enum';
import { TruckType } from '../enum/truck-type.enum';
import { VehicleType } from '../enum/vehicle-type.enum';
import { IsLicencePlateValid } from '../validators/licence.validator';

export class CreateVehicleDto {
  
//   @IsEnum(VehicleType)
//   @IsNotEmpty()
//   vehicleType!: VehicleType;

  @IsEnum({ ...TruckType, ...TrailerType })
  @IsNotEmpty()
  vehicleSubtype: TruckType | TrailerType;

//   @IsNumber()
//   @IsNotEmpty()
//   kilometrage!: number;

//   @IsNumber()
//   @IsNotEmpty()
//   height!: number;

//   @IsNumber()
//   @IsNotEmpty()
//   width!: number;

//   @IsNumber()
//   @IsNotEmpty()
//   depth!: number;

//   @IsNumber()
//   @IsNotEmpty()
//   maxWeight!: number;

//   @IsNumber()
//   @IsNotEmpty()
//   amount!: number;

//   @IsNumber()
//   @IsNotEmpty()
//   costPerKm!: number;

//   @IsBoolean()
//   @IsNotEmpty()
//   isReserved!: boolean;

  @IsString()
  @IsNotEmpty()
  @IsLicencePlateValid()
  licencePlate: string;

//   @IsNumber()
//   @IsNotEmpty()
//   locationId!: number;

//   @IsBoolean()
//   @IsNotEmpty()
//   kilometrageSecuritaire!: boolean;
}
