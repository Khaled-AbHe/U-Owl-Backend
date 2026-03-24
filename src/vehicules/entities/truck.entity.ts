export class Truck {

    public id: number;   

    public model: string;

    public carryingCapacity: number;

    public kilometrage: number;

    public prixParKm: number;

    public isReserved: boolean;

    // à faire tantôt
    public calculatePrice(): number {
        return 0;
    }
}