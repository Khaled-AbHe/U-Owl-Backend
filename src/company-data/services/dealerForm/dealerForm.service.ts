import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dealer } from '../../entities/dealer.entity';
import { Repository } from 'typeorm';
import { CreateFormDto } from '../../dtos/create-form.dto';

@Injectable()
export class DealerService {
    constructor(
        @InjectRepository(Dealer) private dealerRepo : Repository<Dealer>,
        private dealerService : DealerService,
    ) {}

    // CRUD
    async createForm(data : CreateFormDto){
        return await await this.dealerRepo.save(this.dealerRepo.create(data));
    }

    async findAllDealers(){
        return await this.dealerRepo.find({
            relations: {

            }
        });
    }
    
    async findDealerById(dealerId : number){
        const form = await this.dealerRepo.findOneBy({dealerId});

        if(!form){
            throw new BadRequestException("Form doesn't exist");
        }
        return form;
    }
    // async addFormForDealer(data: CreateFormDto){
        
    // }

    async updateForm(dealerId: number, attrs : Partial<Dealer> ){
        const form = await this.findDealerById(dealerId);
    }
}
