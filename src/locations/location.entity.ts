import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicule } from 'src/vehicules/entities/vehicule.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  depotName: string;

  @Column()
  lon: number;

  @Column()
  lat: number;

  // Reference: https://typeorm.io/docs/relations/many-to-one-one-to-many-relations
  @OneToMany(() => Vehicule, (vehicule) => vehicule.location, { eager: true }) // This manages the relation between vehicle and location
  inventory: Vehicule[]; // this is the actual array of vehicules
}