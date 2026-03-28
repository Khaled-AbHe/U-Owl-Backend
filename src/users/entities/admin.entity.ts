import { ChildEntity } from 'typeorm';
import { User } from './users.entity';

@ChildEntity()
export class Admin extends User {}