import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignLocationToAdminDto {
  @IsNumber()
  @IsNotEmpty()
  locationId: number;
}
