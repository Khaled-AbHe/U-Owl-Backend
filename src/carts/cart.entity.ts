import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicule } from 'src/vehicules/entities/vehicule.entity';
import { Client } from 'src/users/entities/client.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Vehicule, (vehicule) => vehicule.location, { eager: true })
  items: Vehicule[];

  @OneToOne(() => Client, (client) => client.cart)
  client: Client;
}