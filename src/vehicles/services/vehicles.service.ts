import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { Truck } from '../entities/truck.entity';
import { Van } from '../entities/van.entity';
import { Factory } from 'src/interfaces/factory.interface';
import { VehicleType } from '../vehicles.enum';
import { CreateVehicleDto } from '../dtos/create-vehicule.dto';

@Injectable()
export class VehiclesService implements Factory {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>, // use for general manipulation
    @InjectRepository(Truck) private truckRepo: Repository<Truck>,
    @InjectRepository(Van) private vanRepo: Repository<Van>,
  ) {} // By doing this way, you will have a User Repo

  async factoryCreate(data: CreateVehicleDto) {
    switch (data.type) {
      case VehicleType.TRUCK:
        // Filter to make sure you have the proper input for Truck
        if (!!data.maxItemHeight)
          throw new BadRequestException(
            'maxItemHeight isnt valid property for Truck',
          );
        else if (!data.maxWeight)
          throw new BadRequestException('maxWeight missing');

        // Returns the created & saved truck
        return await this.truckRepo.save(this.truckRepo.create(data));

      case VehicleType.VAN:
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
}
