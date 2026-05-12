import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FormStatusEnum } from '../enum/form-status.enum';

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

  @Column()
  status: FormStatusEnum;
}
