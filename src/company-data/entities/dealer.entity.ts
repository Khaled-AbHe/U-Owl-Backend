import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity()
export class DealerForm {
  @PrimaryGeneratedColumn()
  dealerFormId: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  businessName: string;

  @Column()
  businessEmail: string;

  @Column()
  phoneNumber: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;
}
