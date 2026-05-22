import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Admin } from '../../users/entities/admin.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  locationId: number;

  @OneToOne(() => Admin, (admin) => admin.location, { nullable: true })
  owner: Admin;

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
