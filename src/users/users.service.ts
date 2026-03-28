import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    [x: string]: any;
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(email: string, password: string) {
        //this.repo.create({email, password})
        const user = await this.repo.save({email, password});
        console.log(user);
        return user
    }

    //a faire
    async findOne(id : number) {
      const user = await this.repo.findOneBy({id});

      if(!user) {
        return null
      }
      return user;
    }

    async remove(id: number) {
      await this.repo.delete(id);
    }

    //a faire
    async findAll() {
      const users = await this.repo.find();
      return users;
    }

    // a faire
    async updateUser(id : number, attrs: Partial<User>) {
      const user = await this.repo.findOneBy({id: 1});

      if(!user) {
        //lancer erreur not found
        return null;
      }

      Object.assign(user, attrs);
      return this.repo.save(user);
    }
    
    async findAllUserByEmail(email : string) {
      const users = await this.repo.findBy({email});
      return users;
    }

    async removeUser(id : number) {
      const user = await this.repo.findOneBy({id});
      if(!user) {
        throw new NotFoundException('user not found');
      }
      return this.repo.remove(user);
    }
}