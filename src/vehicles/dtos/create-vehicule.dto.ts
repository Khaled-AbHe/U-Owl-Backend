import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { TrailerType } from '../enum/trailer-type.enum';
import { TruckType } from '../enum/truck-type.enum';
import { IsLicensePlateValid } from '../validators/license.validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @IsLicensePlateValid()
  licensePlate: string;

  @IsEnum({ ...TruckType, ...TrailerType })
  @IsNotEmpty()
  vehicleSubtype: TruckType | TrailerType;
}
