import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    async findOne(id : number) {
        const user = await this.repo.findOneBy({id});
        return user;
    }

    //constructor( private repo : Repository ) {} // If you just leave it as Repository, it wont know we want a User Repo
    constructor( @InjectRepository(User) private repo : Repository<User> ) {} // By doing this way, you will have a User Repo

    async createUser( email: string, password: string) {
        // const user = await this.repo.create(data) // create just makes a promesse of the new user
        // return await this.repo.save(user) // save actually confirms its creation

        const user = await this.repo.save(this.repo.create({email,password}))
        return user;
    }

    async updateUser(id: number, attrs: Partial<User>) {
        const user = await this.findUserById(id)
        Object.assign(user, attrs)
        return await this.repo.save(user)
    }

    async deleteUserById(id: number) {
        this.repo.delete(await this.findUserById(id))
    }

    async findAllUsers() {
        return await this.repo.find()
    }

    async findUserById(id: number) {
        const user = await this.repo.findOneBy({id});

        if (!user) {
            throw new NotFoundException("User doesn't exit.")
        }

        return user;
    }

    findAllUserByEmail(email : string){

        return this.repo.findBy({email})
    }

}
