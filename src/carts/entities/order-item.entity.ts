import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Cart } from './cart.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderItemId: number;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.orderItem, { eager: true })
  @JoinColumn()
  vehicle: Vehicle;

  @ManyToOne(() => Cart, (cart) => cart.orderItems)
  cart: Cart;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  itemPrice: number;
}
