import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiculeDto } from './create-vehicule.dto';

export class UpdateVehiculeDto extends PartialType(CreateVehiculeDto) {

    public model : string;

    public carryingCapacity : number;

    public kilometrage : number;

    public prixParKm : number;

    public location : Location;
}