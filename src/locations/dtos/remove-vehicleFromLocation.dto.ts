import { IsNumber } from "class-validator";

export class removeVehicleFromLocation{

    @IsNumber()
    vehicleId: number
}