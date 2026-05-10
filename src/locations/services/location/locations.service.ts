import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../../entities/location.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from '../../dtos/create-location.dto';
import { addVehicleToLocationDto } from '../../dtos/add-vehicle-to-location.dto';
import { removeVehicleFromLocationDto } from '../../dtos/remove-vehicleFromLocation.dto';
import { Vehicle } from '../../../vehicles/entities/vehicle.entity';
import { VehiclesService } from '../../../vehicles/services/vehicles.service';
import { MaptilerService } from '../maptiler/maptiler.service';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private locationRepo: Repository<Location>,
    private vehiclesService: VehiclesService,
    private maptilerService: MaptilerService,
  ) {}

  async getAllVehiclesFromLocation(locationId: number): Promise<Vehicle[]> {
    const location = await this.findLocationById(locationId);
    return location.inventory;
  }

  async addVehicleToLocation(dto: addVehicleToLocationDto) {
    const location = await this.findLocationById(dto.locationId);
    const vehicle = await this.vehiclesService.findVehicleById(dto.vehicleId);

    if (this.isVehicleInLocation(location, vehicle)[0]) {
      throw new BadRequestException('Vehicle is already in location');
    }

    location.inventory.push(vehicle);

    return await this.updateLocation(dto.locationId, location);
  }

  async removeVehicleFromLocation(dto: removeVehicleFromLocationDto) {
    const location = await this.findLocationById(dto.locationId);
    const vehicle = await this.vehiclesService.findVehicleById(dto.vehicleId);

    const updatedInventory = this.removeVehicle(location, vehicle);

    return await this.updateLocation(dto.locationId, {
      inventory: updatedInventory,
    });
  }

  // Helpers
  isVehicleInLocation(location: Location, vehicle: Vehicle) {
    const index = location.inventory.findIndex((v) => {
      return v.vehicleId == vehicle.vehicleId;
    });

    return [index !== -1, index] as const;
  }

  removeVehicle(location: Location, vehicle: Vehicle) {
    const [exists, index] = this.isVehicleInLocation(location, vehicle);

    if (!exists) {
      throw new NotFoundException('This vehicle is not in your location');
    }

    return location.inventory.toSpliced(index, 1);
  }

  // CRUD
  async createLocation(data: CreateLocationDto) {
    const { lon, lat } = await this.maptilerService.geocodeAddress(
      data.address,
    );

    return await this.locationRepo.save(
      this.locationRepo.create({
        depotName: data.depotName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        lon: lon,
        lat: lat,
      }),
    );
  }

  async findAllLocations() {
    return await this.locationRepo.find();
  }

  async findLocationById(locationId: number) {
    const location = await this.locationRepo.findOneBy({ locationId });

    if (!location) {
      throw new BadRequestException("Location doesn't exist");
    }

    return location;
  }

  async updateLocation(locationId: number, attrs: Partial<Location>) {
    const location = await this.findLocationById(locationId);

    if (attrs.address) {
      const { lon, lat } = await this.maptilerService.geocodeAddress(
        attrs.address,
      );

      attrs.lon = lon;
      attrs.lat = lat;
    }

    Object.assign(location, attrs);
    return await this.locationRepo.save(location);
  }

  async deleteLocationById(locationId: number) {
    this.locationRepo.remove(await this.findLocationById(locationId));
  }
}
