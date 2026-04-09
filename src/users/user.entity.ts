import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Exclude} from "class-transformer"

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({default: false})
    admin:boolean;

    
}