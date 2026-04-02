import { ChildEntity, Column } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@ChildEntity()
export class Truck extends Vehicle {
  @Column({ default: 1 })
  declare costPerKm: number;

  @Column()
  isElectric: boolean

  @Column()
  seatCount: number

  @Column({ default: true })
  hasLiftGate: boolean;

  @Column()
  towingCapacity: number
}
