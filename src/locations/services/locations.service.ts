import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../location.entity';
import { Repository } from 'typeorm';
// import { Factory } from 'src/interfaces/factory.interface';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { addVehicleToLocationDto } from '../dtos/add-vehicleToLocation.dto';
import { removeVehicleFromLocation } from '../dtos/remove-vehicleFromLocation.dto';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private locationRepo: Repository<Location>,
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
  ) {}

  async createLocation(data: CreateLocationDto) {
    return await this.locationRepo.save(this.locationRepo.create(data));
  }

  async findAllLocations() {
    return await this.locationRepo.find({
      //relations: ['inventory'], // you have to specify the relation so that it can find it easily, or "inventory" will be shown as undefined
    }); // source: https://typeorm.io/docs/working-with-entity-manager/find-options/
  }
  async findVehicleByLocation(){

  }

  async addVehicleToLocation(dto : addVehicleToLocationDto){
    const location = await this.locationRepo.findOneBy({locationId: dto.locationId});
    const vehicle = await this.vehicleRepo.findOneBy({vehicleId: dto.vehicleId});

    if(!location){
      throw new NotFoundException("Location not found");
    }else if(!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }

    vehicle.location = location;
    return await this.vehicleRepo.save(vehicle);

  }

  async removeVehicleFromLocation(dto : removeVehicleFromLocation){
    const vehicle = await this.vehicleRepo.findOneBy( {vehicleId : dto.vehicleId});

    if(!vehicle){
      throw new NotFoundException("Vehicule not found");
    }

    vehicle.location = null;
    return await this.vehicleRepo.save(vehicle);
  }
}
