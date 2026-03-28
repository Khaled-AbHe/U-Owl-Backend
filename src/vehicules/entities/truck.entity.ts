import { ChildEntity, Column } from 'typeorm';
import { Vehicule } from './vehicule.entity';

@ChildEntity()
export class Truck extends Vehicule {
    @Column({ default: 1 })
    declare costPerKm: number;
    
    @Column()
    maxWeight: number;
    
    @Column({ default: true })
    hasLiftGate: boolean;
    
    // à faire tantôt
    public calculatePrice(): number {
        return 0;
    }
}