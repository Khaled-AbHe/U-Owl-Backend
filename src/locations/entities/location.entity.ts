import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  locationId: number;

  @Column()
  depotName: string;

  @Column()
  lon: number;

  @Column()
  lat: number;

  @Column()
  phoneNumber: string;

  // Reference: https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
  @OneToMany(() => Vehicle, (vehicle) => vehicle.location, {
    eager: true,
    cascade: true,
  }) // This manages the relation between vehicle and location
  @JoinColumn()
  inventory: Vehicle[]; // this is the actual array of vehicules
}
