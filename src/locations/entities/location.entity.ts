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
  address: string;

  @Column('float')
  lon: number;

  @Column('float')
  lat: number;

  @Column()
  phoneNumber: string;

  // Reference: https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
  @OneToMany(() => Vehicle, (vehicle) => vehicle.location, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  inventory: Vehicle[];
}
