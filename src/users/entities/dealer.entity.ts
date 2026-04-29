import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Dealer {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userId, { eager: true})
    user: User;
    
    @Column()
    adresse: string;

    @Column()
    disponiblite: string;
    
    @Column()
    imageLieu: string[];
    
    @Column()
    telephone: number;
}