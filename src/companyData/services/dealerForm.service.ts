import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DealerForm } from '../entities/dealer.entity';
import { Repository } from 'typeorm';
import { CreateFormDto } from '../dtos/create-form.dto';

@Injectable()
export class DealerFormService {
  constructor(
    @InjectRepository(DealerForm)
    private dealerFormRepo: Repository<DealerForm>,
  ) {}

  // CRUD
  async createDealerForm(data: CreateFormDto) {
    return await this.dealerFormRepo.save(this.dealerFormRepo.create(data));
  }

  async deleteDealerForm(dealerFormId: number) {
    return await this.dealerFormRepo.delete(dealerFormId);
  }

  async findAllDealerForms() {
    return await this.dealerFormRepo.find();
  }

  async findDealerFormById(dealerFormId: number) {
    const form = await this.dealerFormRepo.findOneBy({ dealerFormId });

    if (!form) {
      throw new BadRequestException("Dealer Form doesn't exist");
    }

    return form;
  }

  async updateDealerForm(dealerFormId: number, attrs: Partial<DealerForm>) {
    const form = await this.findDealerFormById(dealerFormId);
    Object.assign(form, attrs);
    return await this.dealerFormRepo.save(form);
  }
}
