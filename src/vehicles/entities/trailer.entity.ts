import { ChildEntity, Column } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { TrailerType } from '../enum/trailer-type.enum';
import { VehicleType } from '../enum/vehicle-type.enum';

@ChildEntity()
export class Trailer extends Vehicle {
  @Column({ default: VehicleType.TRAILER })
  declare vehicleType: VehicleType;

  @Column()
  declare vehicleSubtype: TrailerType;

  @Column()
  hasRamp: boolean;
}
