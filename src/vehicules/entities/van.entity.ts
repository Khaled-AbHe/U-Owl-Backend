import { ChildEntity, Column } from 'typeorm';
import { Vehicule } from './vehicule.entity';

@ChildEntity()
export class Van extends Vehicule {
    @Column({ default: 0.5 })
    declare costPerKm: number;
    
    @Column()
    maxItemHeight: number;
}