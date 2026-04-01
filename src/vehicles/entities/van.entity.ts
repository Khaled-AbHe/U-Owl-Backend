import { ChildEntity, Column } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@ChildEntity()
export class Van extends Vehicle {
  @Column({ default: 0.5 })
  declare costPerKm: number;

  @Column()
  maxItemHeight: number;
}
