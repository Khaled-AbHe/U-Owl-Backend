import { Injectable } from '@nestjs/common';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { Repository } from 'typeorm';
import { Vehicule } from './entities/vehicule.entity';
import { VehiculeType } from './enums/vehicule-type.enum';
import { User } from 'src/users/users.entity';

@Injectable()
export class VehiculesService {
  private constructor(private repo: Repository<Vehicule>) {}

  public async createVehicule(type: VehiculeType, model: string, kilometrage: number, carryingCapacity: number): Promise<Vehicule> {
    const vehicule =  await this.repo.save({type, model, kilometrage, carryingCapacity});
    console.log(vehicule);
    return vehicule;
  }

  public async modifyVehicule(id: number, attrs: Partial<Vehicule>): Promise<Vehicule> {
    const vehicule = await this.repo.findOneBy({id: 1});

    if(!vehicule) {
      throw new Error("Vehicule introuvable");
    }

    Object.assign(vehicule, attrs);
    return this.repo.save(vehicule);
  }

  public async getVehicules(): Promise<Vehicule[]> {
    const vehicules = await this.repo.find();
    return vehicules;
  }

  public async getVehiculeById(id: number): Promise<Vehicule> {
    const vehicule = await this.repo.findOneBy({id});

    if(!vehicule) {
      throw new Error("Véhicule pas introuvable");
    }

    return vehicule;
  }

  public async deleteVehiculeById(id: number): Promise<Vehicule> {
    const vehicule = await this.repo.findOneBy({id});

    if(!vehicule) {
      throw new Error("Véhicule pas introuvable");
    }

    await this.repo.delete(id);

    return vehicule;
  }
}