import { IsNotEmpty, IsNumber } from 'class-validator';

export class removeVehicleFromLocation {
  @IsNumber()
  @IsNotEmpty()
  locationId: number;

  @IsNumber()
  @IsNotEmpty()
  vehicleId: number;
}
