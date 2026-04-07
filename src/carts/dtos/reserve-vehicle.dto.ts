import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReserveVehicleDto {
  @IsNumber()
  @IsNotEmpty()
  vehicleId: number;

  @IsNumber()
  @IsNotEmpty()
  distance: number;
}
