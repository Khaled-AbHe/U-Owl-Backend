// src/payments/entities/payment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Client } from '../../users/entities/client.entity';
import { PaymentReceipt } from '../interfaces/payment-receipt.interface';
import { PaymentType } from '../enum/payment-type.enum';

@Entity()
export class Payment implements PaymentReceipt {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @ManyToOne(() => Client, (client) => client.purchaseHistory)
  client: Client;

  @Column({ type: 'simple-json' })
  items: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column()
  paymentType: PaymentType;

  @CreateDateColumn()
  createdAt: Date;
}
