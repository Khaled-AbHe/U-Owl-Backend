import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { VehicleType } from '../enum/vehicle-type.enum';
import { Location } from 'src/locations/location.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Vehicle {
  @PrimaryGeneratedColumn()
  vehicleId: number;

  @Column()
  vehicleType: VehicleType

  @Column({ default: 0 })
  kilometrage: number;

  @Column()
  height: number

  @Column()
  width: number

  @Column()
  depth: number

  @Column()
  maxWeight: number

  @Column()
  amount: number

  @Column()
  costPerKm: number;

  @Column({ default: false })
  isReserved: boolean;

  // Reference: https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
  @ManyToOne(() => Location, (location) => location.inventory)
  location: Location;

  // Get rid of this
  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
