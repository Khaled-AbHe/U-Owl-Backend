import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Client } from 'src/users/entities/client.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @Column({ default: 0 })
  totalPrice: number;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.cart, { eager: true })
  items: Vehicle[];

  @OneToOne(() => Client, (client) => client.cart)
  client: Client;
}
