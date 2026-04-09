import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../location.entity';
import { Repository } from 'typeorm';
// import { Factory } from 'src/interfaces/factory.interface';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { addVehicleToLocationDto } from '../dtos/add-vehicleToLocation.dto';
import { removeVehicleFromLocation } from '../dtos/remove-vehicleFromLocation.dto';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { VehiclesService } from '../../vehicles/services/vehicles.service';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private locationRepo: Repository<Location>,
    private vehiclesService: VehiclesService,
  ) {}

  async createLocation(data: CreateLocationDto) {
    return await this.locationRepo.save(this.locationRepo.create(data));
  }

  async findAllLocations() {
    return await this.locationRepo.find({
      //relations: ['inventory'], // you have to specify the relation so that it can find it easily, or "inventory" will be shown as undefined
    }); // source: https://typeorm.io/docs/working-with-entity-manager/find-options/
  }

  async findLocationById(locationId: number) {
    const location = await this.locationRepo.findOneBy({ locationId });

    if (!location) {
      throw new BadRequestException("Location doesn't exist");
    }

    return location;
  }

  async addVehicleToLocation(dto: addVehicleToLocationDto) {
    const location = await this.findLocationById(dto.locationId);
    const vehicle = await this.vehiclesService.findVehicleById(dto.vehicleId);
    location.inventory.push(vehicle);

    return await this.updateLocation(dto.locationId, location);
  }

  async updateLocation(locationId: number, attrs: Partial<Location>) {
    const location = await this.findLocationById(locationId);
    Object.assign(location, attrs);
    return await this.locationRepo.save(location);
  }

  async removeVehicleFromLocation(dto: removeVehicleFromLocation) {
    const location = await this.findLocationById(dto.locationId);
    const vehicle = await this.vehiclesService.findVehicleById(dto.vehicleId); // cherche le véhicule

    const updatedInventory = await this.removeVehicle(location, vehicle);

    return await this.updateLocation(dto.locationId, {
      inventory: updatedInventory,
    });
  }

  // helper
  async removeVehicle(location: Location, vehicle: Vehicle) {
    const itemIndex = location.inventory.findIndex((v) => {
      return v.vehicleId == vehicle.vehicleId;
    });

    if (itemIndex === -1) {
      throw new NotFoundException('This vehicle is not in your location');
    }

    return location.inventory.toSpliced(itemIndex, 1);
  }
}
