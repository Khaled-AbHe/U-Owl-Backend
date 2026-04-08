import { BeforeInsert, BeforeUpdate, ChildEntity, Column } from 'typeorm';
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
  isElectric!: boolean;

  @Column()
  seatCount!: number;

  @Column()
  hasLiftGate!: boolean;

  @Column()
  towingCapacity!: number;

  @BeforeInsert()
  @BeforeUpdate()
  setUpDetails() {
    switch (this.vehicleSubtype) {
      case TruckType.PICKUP:
        // dimensions (cm)
        this.depth = 240;
        this.width = 158;
        this.height = 54;

        // carrying (kg)
        this.towingCapacity = 2722;
        this.maxWeight = 1034;

        // other details
        this.costPerKm = 0.72;
        this.seatCount = 3;
        this.hasLiftGate = false;
        break;
      case TruckType.CARGO_VAN:
        // dimensions (cm)
        this.depth = 290;
        this.width = 170;
        this.height = 142;

        // carrying (kg)
        this.towingCapacity = 2722;
        this.maxWeight = 1828;

        // other details
        this.costPerKm = 0.89;
        this.seatCount = 2;
        this.hasLiftGate = false;
        break;
      case TruckType.SMALL_BOX:
        // dimensions (cm)
        this.depth = 302;
        this.width = 191;
        this.height = 185;

        // carrying (kg)
        this.towingCapacity = 2722;
        this.maxWeight = 1293;

        // other details
        this.costPerKm = 1.05;
        this.seatCount = 2;
        this.hasLiftGate = false;
        break;
      case TruckType.MEDIUM_BOX:
        // dimensions (cm)
        this.depth = 457;
        this.width = 234;
        this.height = 218;

        // carrying (kg)
        this.towingCapacity = 4536;
        this.maxWeight = 2896;

        // other details
        this.costPerKm = 1.25;
        this.seatCount = 3;
        this.hasLiftGate = true;
        break;
      case TruckType.LARGE_BOX:
        // dimensions (cm)
        this.depth = 594;
        this.width = 234;
        this.height = 218;

        // carrying (kg)
        this.towingCapacity = 3402;
        this.maxWeight = 2585;

        // other details
        this.costPerKm = 1.45;
        this.seatCount = 3;
        this.hasLiftGate = true;
        break;
      case TruckType.X_LARGE_BOX:
        // dimensions (cm)
        this.depth = 798;
        this.width = 249;
        this.height = 251;

        // carrying (kg)
        this.towingCapacity = 4536;
        this.maxWeight = 5833;

        // other details
        this.costPerKm = 1.75;
        this.seatCount = 3;
        this.hasLiftGate = true;
        break;
    }
  }
}
