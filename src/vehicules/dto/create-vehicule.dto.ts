import { IsNumber, IsString } from "class-validator";

export class CreateVehiculeDto {
    
    @IsString()
    public model: string;

    @IsNumber()
    public carryingCapacity: number;

    @IsNumber()
    public kilometrage: number;
}