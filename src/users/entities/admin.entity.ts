import { ChildEntity, Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { AdminType } from '../enums/admin-type.enum';
import { Location } from '../../locations/entities/location.entity';

@ChildEntity()
export class Admin extends User {
  @Column()
  adminType: AdminType;

  @OneToOne(() => Location, (location) => location.owner, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  location: Location | null;
}
