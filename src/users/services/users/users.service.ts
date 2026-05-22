import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Factory } from '../../../interfaces/factory.interface';
import { Client } from '../../entities/client.entity';
import { Admin } from '../../entities/admin.entity';
import { UserType } from '../../enums/users.enum';
import { AdminType } from '../../enums/admin-type.enum';
import { LocationsService } from '../../../locations/services/location/locations.service';

@Injectable()
export class UsersService implements Factory {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    private locationsService: LocationsService,
  ) {}

  async assignLocationToAdmin(userId: number, locationId: number) {
    const user = (await this.findUserById(userId)) as Admin;

    if (
      user.userType != UserType.ADMIN ||
      user.adminType != AdminType.LOCATION_ADMIN
    ) {
      throw new NotFoundException(`User ${userId} is not a Location Admin`);
    }
    if (!!user.location) {
      throw new ConflictException(`User ${userId} already has a location`);
    }

    const location = await this.locationsService.findLocationById(locationId);
    return await this.updateUser(userId, { location: location });
  }

  async unassignLocationToAdmin(userId: number) {
    const user = (await this.findUserById(userId)) as Admin;

    if (
      user.userType != UserType.ADMIN ||
      user.adminType != AdminType.LOCATION_ADMIN
    ) {
      throw new NotFoundException(`User ${userId} is not a Location Admin`);
    }
    if (user.location == null) {
      throw new NotFoundException('Location admin doesnt have a location');
    }

    return await this.updateUser(userId, { location: null });
  }

  async factoryCreate(data: {
    name: string;
    surname: string;
    userType: UserType;
    adminType: AdminType;
    email: string;
    password: string;
  }) {
    switch (data.userType) {
      case UserType.CLIENT:
        return await this.clientRepo.save(
          this.clientRepo.create({
            ...data,
            cart: {},
          }),
        );
      case UserType.ADMIN:
        return await this.adminRepo.save(this.adminRepo.create(data));
      default:
        throw new BadRequestException('Invalid User Type');
    }
  }

  async updateUser<T extends Client | Admin>(
    userId: number,
    attrs: Partial<T>,
  ) {
    const user = await this.findUserById(userId);

    switch (user.userType) {
      case UserType.CLIENT:
        Object.assign(user, attrs as Partial<Client>);
        return await this.clientRepo.save(user);
      case UserType.ADMIN:
        Object.assign(user, attrs as Partial<Admin>);
        return await this.adminRepo.save(user);
    }
  }

  async deleteUserById(userId: number) {
    this.userRepo.remove(await this.findUserById(userId));
  }

  async findAllUsers() {
    return await this.userRepo.find();
  }

  async findUserById(userId: number) {
    const user = await this.userRepo.findOneBy({ userId });

    if (!user) {
      throw new NotFoundException("User doesn't exist.");
    }

    return user;
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  // Used for current user logic
  async findOneUser(userId: number) {
    return await this.userRepo.findOneBy({ userId });
  }
}
