import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { VehicleType } from '../enum/vehicle-type.enum';
import { Location } from '../../locations/entities/location.entity';
import { TruckType } from '../enum/truck-type.enum';
import { TrailerType } from '../enum/trailer-type.enum';
import { OrderItem } from '../../carts/entities/order-item.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Vehicle {
  @PrimaryGeneratedColumn()
  vehicleId: number;

  @Column()
  licensePlate: string;

  @Column()
  vehicleType: VehicleType;

  @Column()
  vehicleSubtype: TruckType | TrailerType;

  @Column({ default: 0 })
  kilometrage: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  depth: number;

  @Column()
  maxWeight: number;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  costPerKm: number;

  @Column({ default: false })
  isReserved: boolean;

  // Reference: https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
  @ManyToOne(() => Location, (location) => location.inventory, {
    nullable: true,
  })
  location: Location | null;

  // Get rid of this
  @OneToOne(() => OrderItem, (orderItem) => orderItem.vehicle)
  orderItem: OrderItem;

  @Column({ default: false })
  isSafe: boolean;
}
