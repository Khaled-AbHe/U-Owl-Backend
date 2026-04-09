import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { TrailerType } from '../enum/trailer-type.enum';
import { TruckType } from '../enum/truck-type.enum';
import { VehicleType } from '../enum/vehicle-type.enum';
import { IsLicencePlateValid } from '../validators/licence.validator';

export class UpdateVehicleDto {
    @IsEnum(VehicleType)
    @IsOptional()
    vehicleType!: VehicleType;
    
    @IsEnum({ ...TruckType, ...TrailerType })
    @IsOptional()
    vehicleSubtype!: TruckType | TrailerType;
    
    @IsNumber()
    @IsOptional()
    kilometrage!: number;
    
    @IsNumber()
    @IsOptional()
    height!: number;
    
    @IsNumber()
    @IsOptional()
    width!: number;
    
    @IsNumber()
    @IsOptional()
    depth!: number;
    
    @IsNumber()
    @IsOptional()
    maxWeight!: number;
    
    @IsNumber()
    @IsOptional()
    amount!: number;
    
    @IsNumber()
    @IsOptional()
    costPerKm!: number;
    
    @IsBoolean()
    @IsOptional()
    isReserved!: boolean;
    
    @IsString()
    @IsLicencePlateValid()
    @IsOptional()
    licencePlate!: string;
    
    @IsNumber()
    @IsOptional()
    location!: Location;
    
    @IsBoolean()
    @IsOptional()
    kilometrageSecuritaire!: boolean;
}
