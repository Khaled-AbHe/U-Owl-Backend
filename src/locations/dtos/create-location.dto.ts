import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocationDto {

  @IsNumber()
  @IsNotEmpty()
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
