import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocationDto {


  id : number
  @IsString()
  @IsNotEmpty()
  depotName: string;

  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @IsNumber()
  @IsNotEmpty()
  lat: number;
}
