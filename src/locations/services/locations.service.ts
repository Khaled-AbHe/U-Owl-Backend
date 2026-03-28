import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../location.entity';
import { Repository } from 'typeorm';
import { Factory } from 'src/interfaces/factory.interface';
import { CreateLocationDto } from '../dtos/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(@InjectRepository(Location) private repo: Repository<Location>) {}

  async createLocation(data: CreateLocationDto) {
    return await this.repo.save(this.repo.create(data));
  }

  async findAllLocations() {
    return await this.repo.find({
      //relations: ['inventory'], // you have to specify the relation so that it can find it easily, or "inventory" will be shown as undefined
    }); // source: https://typeorm.io/docs/working-with-entity-manager/find-options/
  }
}
