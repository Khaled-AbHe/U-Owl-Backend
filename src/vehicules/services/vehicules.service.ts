import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicule } from '../entities/vehicule.entity';
import { Truck } from '../entities/truck.entity';
import { Van } from '../entities/van.entity';
import { Factory } from 'src/interfaces/factory.interface';
import { VehiculeType } from '../enums/vehicule-type.enum'
import { CreateVehiculeDto } from '../dto/create-vehicule.dto';

@Injectable()
export class VehiculesService implements Factory {
  constructor(
    @InjectRepository(Vehicule) private vehicleRepo: Repository<Vehicule>, // use for general manipulation
    @InjectRepository(Truck) private truckRepo: Repository<Truck>,
    @InjectRepository(Van) private vanRepo: Repository<Van>,
  ) {} // By doing this way, you will have a User Repo

  async factoryCreate(data: CreateVehiculeDto) {
    switch (data.type) {
      case VehiculeType.Truck:
        // Filter to make sure you have the proper input for Truck
        if (!!data.maxItemHeight)
          throw new BadRequestException(
            'maxItemHeight isnt valid property for Truck',
          );
        else if (!data.maxWeight)
          throw new BadRequestException('maxWeight missing');

        // Returns the created & saved truck
        return await this.truckRepo.save(this.truckRepo.create(data));

      case VehiculeType.Van:
        // Filter to make sure you have the proper input for Van
        if (!!data.maxWeight)
          throw new BadRequestException(
            'maxWeight isnt valid property for Van',
          );
        else if (!data.maxItemHeight)
          throw new BadRequestException('maxItemHeight missing');

        // Returns the created & saved van
        return await this.vanRepo.save(this.vanRepo.create(data));

      default:
        throw new BadRequestException('Invalid Vehicle Type');
    }
  }

  async findAllVehicles() {
    return await this.vehicleRepo.find(/*{ relations: ['inventory'] }*/);
  }

  async findAllTrucks() {
    return await this.truckRepo.find();
  }

  async findAllVans() {
    return await this.vanRepo.find();
  }

  //à faire
  async modifyVehicule(id : number, attrs: Partial<Vehicule>) {
    const vehicule = await this.vehicleRepo.findOneBy({id});

    if(!vehicule) {
      return null;
    }

    Object.assign(vehicule, attrs);
    return this.vehicleRepo.save(vehicule);
  }

  //à faire
  async isRoadSafe() {

  }

  //à faire
  async getVehiculeById(id: number) {
    const vehicule = await this.vehicleRepo.findOneBy({id});

    if(!vehicule) {
      return null;
    }

    return vehicule;
  }

  //à faire
  async deleteVehiculeById(id: number) {
    await this.vehicleRepo.delete(id);
  }
}