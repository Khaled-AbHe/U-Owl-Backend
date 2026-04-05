import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from 'src/users/entities/client.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @Column({ default: 0 })
  totalPrice: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.cart, { eager: true })
  orderItems: OrderItem[];

  @OneToOne(() => Client, (client) => client.cart)
  client: Client;
}
