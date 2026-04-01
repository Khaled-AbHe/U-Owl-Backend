import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Client } from 'src/users/entities/client.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.location, { eager: true })
  items: Vehicle[];

  @OneToOne(() => Client, (client) => client.cart)
  client: Client;
}
