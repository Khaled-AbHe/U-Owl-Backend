import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Factory } from '../../../interfaces/factory.interface';
import { Client } from '../../entities/client.entity';
import { Admin } from '../../entities/admin.entity';
import { UserType } from '../../enums/users.enum';

@Injectable()
export class UsersService implements Factory {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
  ) {}

  async factoryCreate(data: {
    userType: UserType;
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
        throw new BadRequestException('Invalid Vehicle Type');
    }
  }

  async updateUser(userId: number, attrs: Partial<User>) {
    const user = await this.findUserById(userId);
    Object.assign(user, attrs);
    return await this.userRepo.save(user);
  }

  async deleteUserById(userId: number) {
    this.userRepo.delete(await this.findUserById(userId));
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

  async findOneUser(userId: number) {
    return await this.userRepo.findOneBy({ userId });
  }
}
