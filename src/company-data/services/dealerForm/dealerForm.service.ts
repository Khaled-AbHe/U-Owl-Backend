import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DealerForm } from '../../entities/dealer.entity';
import { Repository } from 'typeorm';
import { CreateFormDto } from '../../dtos/create-form.dto';


@Injectable()
export class DealerFormService {
  constructor(
    @InjectRepository(DealerForm)
    private dealerFormRepo: Repository<DealerForm>,
  ) {}

  // CRUD
  async createForm(data: CreateFormDto) {
    return await this.dealerFormRepo.save(this.dealerFormRepo.create(data));
  }

  async deleteForm(dealerFormId : number) {
    return await this.dealerFormRepo.delete(dealerFormId);
  }

  async findAllDealersForms() {
    return await this.dealerFormRepo.find();
  }

  async findDealerById(dealerFormId: number) {
    const form = await this.dealerFormRepo.findOneBy({ dealerFormId });

    if (!form) {
      throw new BadRequestException("Form doesn't exist");
    }
    return form;
  }

  async updateForm(dealerFormId: number, attrs: Partial<DealerForm>) {
    const form = await this.findDealerById(dealerFormId);
    Object.assign(form, attrs);
    return await this.dealerFormRepo.save(form);
  }
}
