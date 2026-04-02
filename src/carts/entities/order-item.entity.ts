import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
// import { Client } from 'src/users/entities/client.entity';
import { Cart } from './cart.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderItemId: number;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.cart, { eager: true })
  vehicle: Vehicle;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @Column({ default: 0 })
  itemPrice: number;
}
