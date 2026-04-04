import { BeforeInsert, BeforeUpdate, ChildEntity, Column } from 'typeorm';
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

  @BeforeInsert()
  @BeforeUpdate()
  setUpDetails() {
    switch (this.vehicleSubtype) {
      case TrailerType.SMALL:
        // dimensions (cm)
        this.depth = 246;
        this.width = 127;
        this.height = 122;

        // carrying (kg)
        this.maxWeight = 748;

        // other details
        this.hasRamp = false;
        this.costPerKm = 0.45;
        break;

      case TrailerType.MEDIUM:
        // dimensions (cm)
        this.depth = 246;
        this.width = 142;
        this.height = 152;

        // carrying (kg)
        this.maxWeight = 816;

        // other details
        this.hasRamp = false;
        this.costPerKm = 0.52;
        break;

      case TrailerType.LARGE:
        // dimensions (cm)
        this.depth = 353;
        this.width = 183;
        this.height = 160;

        // carrying (kg)
        this.maxWeight = 803;

        // other details
        this.hasRamp = true;
        this.costPerKm = 0.65;
        break;
    }
  }
}
