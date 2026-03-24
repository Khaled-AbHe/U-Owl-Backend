import { Injectable } from '@nestjs/common';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { Repository } from 'typeorm';
import { Vehicule } from './entities/vehicule.entity';
import { VehiculeType } from './enums/vehicule-type.enum';

@Injectable()
export class VehiculesService {
  private constructor(private repo: Repository<Vehicule>) {}

  public createVehicule(type: VehiculeType, model: string, kilometrage: number, carryingCapacity: number): Promise<Vehicule> {

  }

  public modifyVehicule(id: number, attrs: Partial<Vehicule>): Promise<Vehicule[]> {

  }

  public getVehicules(): Promise<Vehicule[]> {

  }

  public getVehiculeById(id: number): Promise<Vehicule[]> {

  }

  public deleteVehiculeById(id: number): Promise<Vehicule> {
    
  }
}