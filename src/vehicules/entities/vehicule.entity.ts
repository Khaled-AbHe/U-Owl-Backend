import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { VehiculeType } from '../enums/vehicule-type.enum';
import { Location } from 'src/locations/location.entity';
import { Cart } from 'src/carts/cart.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Vehicule {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    type: VehiculeType;
    
    @Column()
    model: string;
    
    @Column()
    carryingSpace: number;
    
    @Column({ default: 0 })
    kilometrage: number;
    
    @Column()
    costPerKm: number;
    
    @Column({ default: false })
    isReserved: boolean;
    
    // Reference: https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
    @ManyToOne(() => Location, (location) => location.inventory)
    location: Location;
    
    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;
    
    // à faire tantôt
    public calculatePrice(): number {
        return this.kilometrage * this.costPerKm;
    }
}