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

  async setVehicleAsReserved(vehicle: Vehicle) {
    if (vehicle.isReserved) {
      throw new BadRequestException(
        `Vehicle ${vehicle.vehicleId} is already reserved`,
      );
    }

    return await this.updateVehicle(vehicle.vehicleId, {
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
      isReserved: false,
    });
  }

  async isRoadSafe(vehicleId: number) {
    const vehicule = await this.findVehicleById(vehicleId);

    if (vehicule.kilometrage < 350000) {
      return this.updateVehicle(vehicleId, { isSafe: true });
    } else {
      return this.updateVehicle(vehicleId, { isSafe: false });
    }
  }

  // CRUD
  async factoryCreate(data: {
    licencePlate: string;
    vehicleSubtype: TruckType | TrailerType;
  }) {
    if (await this.isLicencePlateUnique(data.licencePlate)) {
      if (
        Object.values(TrailerType).includes(data.vehicleSubtype as TrailerType)
      ) {
        // gets the right attributes
        const newTrailer: Trailer = Object.assign(
          data as Trailer,
          this.assignTrailerAttributes(data as Trailer),
        );
        // creates and saves the new trailer
        return await this.trailerRepo.save(this.trailerRepo.create(newTrailer));
      } else if (
        Object.values(TruckType).includes(data.vehicleSubtype as TruckType)
      ) {
        // gets the right attributes
        const newTruck: Truck = Object.assign(
          data as Truck,
          this.assignTruckAttributes(data as Truck),
        );
        // creates and saves the new truck
        return await this.truckRepo.save(this.truckRepo.create(newTruck));
      } else {
        throw new BadRequestException('Invalid Vehicle Type');
      }
    } else {
      throw new BadRequestException(
        `A vehicle with the licence plate: '${data.licencePlate}' already exists`,
      );
    }
  }

  async deleteVehicleById(vehicleId: number) {
    this.vehicleRepo.remove(await this.findVehicleById(vehicleId));
  }

  async findVehicleById(vehicleId: number) {
    const vehicle = await this.vehicleRepo.findOneBy({ vehicleId });

    if (!vehicle) {
      throw new NotFoundException("Vehicle doesn't exist");
    }

    return vehicle;
  }

  async updateVehicle<T extends Truck | Trailer>(
    vehicleId: number,
    attrs: Partial<T>,
  ) {
    const vehicle = await this.findVehicleById(vehicleId);

    switch (vehicle.vehicleType) {
      case VehicleType.TRUCK:
        Object.assign(vehicle, attrs as Partial<Truck>);
        return await this.truckRepo.save(vehicle as DeepPartial<Truck>);
      case VehicleType.TRAILER:
        Object.assign(vehicle, attrs as Partial<Trailer>);
        return await this.trailerRepo.save(vehicle as DeepPartial<Trailer>);
    }
  }

  async findAllVehicles() {
    return await this.vehicleRepo.find();
  }

  async findAllTrucks() {
    return await this.truckRepo.find();
  }

  async findAllTrailers() {
    return await this.trailerRepo.find();
  }

  // Helpers
  async isLicencePlateUnique(licencePlate: string) {
    const vehicle = await this.vehicleRepo.findOneBy({ licencePlate });
    return !vehicle ? true : false;
  }

  assignTruckAttributes(data: {
    licencePlate: string;
    vehicleSubtype: TruckType;
  }) {
    let attributes = {
      vehicleType: VehicleType.TRUCK,
      // dimensions (cm)
      depth: 0,
      width: 0,
      height: 0,
      // carrying (kg)
      towingCapacity: 0,
      maxWeight: 0,
      // other details
      costPerKm: 0,
      seatCount: 0,
      hasLiftGate: false,
      isSafe: true,
    };

    switch (data.vehicleSubtype) {
      case TruckType.PICKUP:
        attributes.depth = 240;
        attributes.width = 158;
        attributes.height = 54;
        attributes.towingCapacity = 2722;
        attributes.maxWeight = 1034;
        attributes.costPerKm = 0.72;
        attributes.seatCount = 3;
        attributes.hasLiftGate = false;
        break;

      case TruckType.CARGO_VAN:
        attributes.depth = 290;
        attributes.width = 170;
        attributes.height = 142;
        attributes.towingCapacity = 2722;
        attributes.maxWeight = 1828;
        attributes.costPerKm = 0.89;
        attributes.seatCount = 2;
        attributes.hasLiftGate = false;
        break;

      case TruckType.SMALL_BOX:
        attributes.depth = 302;
        attributes.width = 191;
        attributes.height = 185;
        attributes.towingCapacity = 2722;
        attributes.maxWeight = 1293;
        attributes.costPerKm = 1.05;
        attributes.seatCount = 2;
        attributes.hasLiftGate = false;
        break;

      case TruckType.MEDIUM_BOX:
        attributes.depth = 457;
        attributes.width = 234;
        attributes.height = 218;
        attributes.towingCapacity = 4536;
        attributes.maxWeight = 2896;
        attributes.costPerKm = 1.25;
        attributes.seatCount = 3;
        attributes.hasLiftGate = true;
        break;

      case TruckType.LARGE_BOX:
        attributes.depth = 594;
        attributes.width = 234;
        attributes.height = 218;
        attributes.towingCapacity = 3402;
        attributes.maxWeight = 2585;
        attributes.costPerKm = 1.45;
        attributes.seatCount = 3;
        attributes.hasLiftGate = true;
        break;

      case TruckType.X_LARGE_BOX:
        attributes.depth = 798;
        attributes.width = 249;
        attributes.height = 251;
        attributes.towingCapacity = 4536;
        attributes.maxWeight = 5833;
        attributes.costPerKm = 1.75;
        attributes.seatCount = 3;
        attributes.hasLiftGate = true;
        break;
    }
    return attributes;
  }

  assignTrailerAttributes(data: {
    licencePlate: string;
    vehicleSubtype: TrailerType;
  }) {
    let attributes = {
      vehicleType: VehicleType.TRAILER,
      // dimensions (cm)
      depth: 0,
      width: 0,
      height: 0,
      // carrying (kg)
      maxWeight: 0,
      // other details
      costPerKm: 0,
      hasRamp: false,
      isSafe: true,
    };

    switch (data.vehicleSubtype) {
      case TrailerType.SMALL:
        attributes.depth = 246;
        attributes.width = 127;
        attributes.height = 122;
        attributes.maxWeight = 748;
        attributes.hasRamp = false;
        attributes.costPerKm = 0.45;
        break;

      case TrailerType.MEDIUM:
        attributes.depth = 246;
        attributes.width = 142;
        attributes.height = 152;
        attributes.maxWeight = 816;
        attributes.hasRamp = false;
        attributes.costPerKm = 0.52;
        break;

      case TrailerType.LARGE:
        attributes.depth = 353;
        attributes.width = 183;
        attributes.height = 160;
        attributes.maxWeight = 803;
        attributes.hasRamp = true;
        attributes.costPerKm = 0.65;
        break;
    }
    return attributes;
  }
}
