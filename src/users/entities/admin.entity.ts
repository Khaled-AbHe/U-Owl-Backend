import { ChildEntity, Column } from 'typeorm';
import { User } from './user.entity';
import { AdminType } from '../enums/admin-type.enum';

@ChildEntity()
export class Admin extends User {
    @Column()
    adminType: AdminType
}
