import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dealer {
    @PrimaryGeneratedColumn()
    dealerId: number;

    @Column()
    fullName : string;

    @Column()
    email : string;

    @Column()
    businessName : string;

    @Column()
    businessEmail : string;

    @Column()
    phoneNumber : string;

    @Column()
    city : string; 
    
    @Column()
    postalCode : string

}