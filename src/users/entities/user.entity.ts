import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserType } from '../enums/users.enum';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } }) // combines admin and client into the user table
export class User {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column()
  userType!: UserType;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  surname!: string;

  @Column()
  email!: string;

  @Exclude() // this tells interceptors that password should be hidden
  @Column()
  password!: string;
}
