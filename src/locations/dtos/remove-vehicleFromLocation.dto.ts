import { IsNotEmpty, IsNumber } from 'class-validator';

export class removeVehicleFromLocationDto {
  @IsNumber()
  @IsNotEmpty()
  locationId: number;

  @IsNumber()
  @IsNotEmpty()
  vehicleId: number;
}
