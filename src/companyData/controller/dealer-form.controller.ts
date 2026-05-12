import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFormDto } from '../dtos/create-form.dto';
import { UpdateFormDto } from '../dtos/update-form.dto';
import { DealerFormService } from '../services/dealerForm.service';

@Controller('dealerform')
export class DealerFormController {
  constructor(private dealerFormService: DealerFormService) {}

  // CRUD
  @Post('/create')
  createDealerForm(@Body() body: CreateFormDto) {
    return this.dealerFormService.createDealerForm(body);
  }

  @Delete('/:id')
  deleteDealerForm(@Param('id') dealerFormId: number) {
    return this.dealerFormService.deleteDealerForm(dealerFormId);
  }

  @Get('/all')
  findAllDealerForms() {
    return this.dealerFormService.findAllDealerForms();
  }

  @Get('/find/:id')
  findDealerFormById(@Param('id') dealerFormId: number) {
    return this.dealerFormService.findDealerFormById(dealerFormId);
  }

  @Patch('/update/:id')
  updateDealerForm(
    @Param('id') dealerFormId: number,
    @Body() body: UpdateFormDto,
  ) {
    return this.dealerFormService.updateDealerForm(dealerFormId, body);
  }
}
