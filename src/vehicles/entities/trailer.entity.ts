import { ChildEntity, Column } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@ChildEntity()
export class Trailer extends Vehicle {
  @Column({ default: 0.5 })
  declare costPerKm: number;

  @Column()
  hasRamp: boolean;
}
