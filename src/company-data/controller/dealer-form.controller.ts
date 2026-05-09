import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
} from '@nestjs/common';
import { DealerFormService } from '../services/dealerForm/dealerForm.service';
import { CreateFormDto } from '../dtos/create-form.dto';
import { UpdateFormDto } from '../dtos/update-form.dto';

@Controller('dealer-form')
export class DealerFormController {
  constructor(private formService: DealerFormService) {}

  // CRUD
  @Post('/create')
  createForm(@Body() body: CreateFormDto) {
    return this.formService.createForm(body);
  }

  @Delete('/:id')
  deleteForm(@Param('id') dealerFormId: number) {
    return this.formService.deleteForm(dealerFormId);
  }

  @Get('/all')
  findAllDealersForms() {
    return this.formService.findAllDealersForms();
  }

  @Get('/find/:id')
  findDealerById(@Param('id') dealerFormId: number) {
    return this.formService.findDealerById(dealerFormId);
  }

  @Patch('/update/:id')
  updateForm(@Param('id') dealerFormId: number, @Body() body: UpdateFormDto) {
    return this.formService.updateForm(dealerFormId, body);
  }
}
