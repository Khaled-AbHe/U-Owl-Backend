import { ChildEntity, Column } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@ChildEntity()
export class Truck extends Vehicle {
  @Column({ default: 1 })
  declare costPerKm: number;

  @Column()
  maxWeight: number;

  @Column({ default: true })
  hasLiftGate: boolean;
}
