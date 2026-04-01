import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Factory } from 'src/interfaces/factory.interface';
import { Client } from 'src/users/entities/client.entity';
import { Admin } from 'src/users/entities/admin.entity';
import { UserType } from 'src/users/users.enum';

@Injectable()
export class UsersService implements Factory {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
  ) {}

  async factoryCreate(data: {
    type: UserType;
    email: string;
    password: string;
  }) {
    switch (data.type) {
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

  // async createUser(email: string, password: string) {
  //   // const user = await this.userRepo.create(data) // create just makes a promise of the new user
  //   // return await this.userRepo.save(user) // save actually confirms its creation and saves it in the db
  //   return await this.userRepo.save(
  //     this.userRepo.create({ email: email, password: password }),
  //   );
  // }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.findUserById(id);
    Object.assign(user, attrs);
    return await this.userRepo.save(user);
  }

  async deleteUserById(id: number) {
    this.userRepo.delete(await this.findUserById(id));
  }

  async findAllUsers() {
    return await this.userRepo.find();
  }

  async findUserById(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException("User doesn't exist.");
    }

    return user;
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async findOneUser(id: number) {
    return await this.userRepo.findOneBy({ id });
  }
}
