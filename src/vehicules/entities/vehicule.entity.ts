import { VehiculeType } from "../enums/vehicule-type.enum";

export class Vehicule {

    public id: number;

    public type: VehiculeType;

    public model: string;

    public carryingCapacity: number;

    public kilometrage: number;

    public prixParKm: number;

    public isReserved: boolean;
  location: any;

    // à faire tantôt
    public calculatePrice(): number {
        return 0;
    }
}