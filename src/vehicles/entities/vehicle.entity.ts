import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { VehicleType } from '../vehicles.enum';
import { Location } from 'src/locations/location.entity';
import { Cart } from 'src/carts/cart.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: VehicleType;

  @Column()
  model: string;

  @Column()
  carryingSpace: number;

  @Column({ default: 0 })
  kilometrage: number;

  @Column()
  costPerKm: number;

  @Column({ default: false })
  isReserved: boolean;

  // Reference: https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
  @ManyToOne(() => Location, (location) => location.inventory)
  location: Location;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
