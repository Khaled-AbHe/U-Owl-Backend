import { ChildEntity, Column } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { TruckType } from '../enum/truck-type.enum';
import { VehicleType } from '../enum/vehicle-type.enum';

@ChildEntity()
export class Truck extends Vehicle {
  @Column({ default: VehicleType.TRUCK })
  declare vehicleType: VehicleType;

  @Column()
  declare vehicleSubtype: TruckType;

  @Column({ default: false })
  isElectric: boolean;

  @Column()
  seatCount: number;

  @Column()
  hasLiftGate: boolean;

  @Column()
  towingCapacity: number;
}
