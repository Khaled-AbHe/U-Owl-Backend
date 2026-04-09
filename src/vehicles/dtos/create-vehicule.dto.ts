import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { TrailerType } from '../enum/trailer-type.enum';
import { TruckType } from '../enum/truck-type.enum';
import { IsLicencePlateValid } from '../validators/licence.validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @IsLicencePlateValid()
  licencePlate: string;

  @IsEnum({ ...TruckType, ...TrailerType })
  @IsNotEmpty()
  vehicleSubtype: TruckType | TrailerType;
}