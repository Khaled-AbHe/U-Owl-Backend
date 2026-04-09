import { IsNumber } from "class-validator";

export class addVehicleToLocationDto{

    @IsNumber()
    locationId: number

    @IsNumber()
    vehicleId: number
}