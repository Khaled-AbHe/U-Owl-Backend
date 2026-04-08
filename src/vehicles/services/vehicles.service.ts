import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { Truck } from '../entities/truck.entity';
import { Factory } from '../../interfaces/factory.interface';
import { VehicleType } from '../enum/vehicle-type.enum';
import { CreateVehicleDto } from '../dtos/create-vehicule.dto';
import { Trailer } from '../entities/trailer.entity';
import { TrailerType } from '../enum/trailer-type.enum';
import { TruckType } from '../enum/truck-type.enum';

@Injectable()
export class VehiclesService implements Factory {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>, // use for general manipulation
    @InjectRepository(Truck) private truckRepo: Repository<Truck>,
    @InjectRepository(Trailer) private trailerRepo: Repository<Trailer>,
  ) {} 

  async factoryCreate(data: CreateVehicleDto) {
    if (await this.areVehicleDetailsValid(data)) {
      switch (data.vehicleType) {
        case VehicleType.TRUCK:
          return await this.truckRepo.save(
            this.truckRepo.create(data as DeepPartial<Truck>),
          );

        case VehicleType.TRAILER:
          return await this.trailerRepo.save(
            this.trailerRepo.create(data as DeepPartial<Trailer>),
          );

        default:
          throw new BadRequestException('Invalid Vehicle Type');
      }
    }
  }

  async findAllVehicles() {
    return await this.vehicleRepo.find(/*{ relations: ['inventory'] }*/);
  }

  async findAllTrucks() {
    return await this.truckRepo.find();
  }

  async findAllTrailers() {
    return await this.trailerRepo.find();
  }

  //// Helper functions
  // crud
  async findVehicleById(vehicleId: number) {
    const vehicle = await this.vehicleRepo.findOneBy({ vehicleId });

    if (!vehicle) {
      throw new NotFoundException("Vehicle doesn't exist");
    }

    return vehicle;
  }

  async updateVehicle(vehicleId: number, attrs: Partial<Vehicle>) {
    const vehicule = await this.findVehicleById(vehicleId);
    Object.assign(vehicule, attrs);
    return await this.vehicleRepo.save(vehicule);
  }

  // creation
  async isLicencePlateUnique(licencePlate: string) {
    const vehicle = await this.vehicleRepo.findOneBy({ licencePlate });
    return !vehicle ? true : false;
  }

  async areVehicleDetailsValid(data: CreateVehicleDto) {
    if (
      (data.vehicleType == 'Truck' && // Makes sure that you arent assigning Trailer sub types to Trucks
        Object.values(TrailerType).includes(
          data.vehicleSubtype as TrailerType,
        )) ||
      (data.vehicleType == 'Trailer' && // Makes sure that you arent assigning Truck sub types to Trailers
        Object.values(TruckType).includes(data.vehicleSubtype as TruckType))
    ) {
      throw new BadRequestException(
        `The '${data.vehicleSubtype}' type is not a ${data.vehicleType} type.`,
      );
    }

    if (!(await this.isLicencePlateUnique(data.licencePlate))) {
      throw new BadRequestException(
        `A vehicle with the licence plate: '${data.licencePlate}' already exists`,
      );
    }

    return true;
  }

  // other

  async setVehicleAsReserved(vehicle: Vehicle) {
    if (vehicle.isReserved) {
      throw new BadRequestException(
        `Vehicle ${vehicle.vehicleId} is already reserved`,
      );
    }

    return await this.updateVehicle(vehicle.vehicleId, {
      ...vehicle,
      isReserved: true,
    });
  }

  async setVehicleAsAvailable(vehicle: Vehicle) {
    if (!vehicle.isReserved) {
      throw new BadRequestException(
        `Vehicle ${vehicle.vehicleId} is already available`,
      );
    }

    return await this.updateVehicle(vehicle.vehicleId, {
      ...vehicle,
      isReserved: false,
    });
  }
}
