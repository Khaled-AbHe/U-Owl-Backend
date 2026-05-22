import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateFormDto } from '../dtos/create-form.dto';
import { UpdateFormDto } from '../dtos/update-form.dto';
import { DealerFormService } from '../services/dealerForm.service';
import { AuthGuard } from '../../currentUser/guards/auth.guard';
import { SuperAdminGuard } from '../../currentUser/guards/super-admin.guard';

@Controller('dealerform')
export class DealerFormController {
  constructor(private dealerFormService: DealerFormService) {}

  // CRUD
  @Post('/create')
  createDealerForm(@Body() body: CreateFormDto) {
    return this.dealerFormService.createDealerForm(body);
  }

  @UseGuards(AuthGuard, SuperAdminGuard)
  @Delete('/:id')
  deleteDealerForm(@Param('id') dealerFormId: number) {
    return this.dealerFormService.deleteDealerForm(dealerFormId);
  }

  @UseGuards(AuthGuard, SuperAdminGuard)
  @Get('/all')
  findAllDealerForms() {
    return this.dealerFormService.findAllDealerForms();
  }

  @UseGuards(AuthGuard, SuperAdminGuard)
  @Get('/find/:id')
  findDealerFormById(@Param('id') dealerFormId: number) {
    return this.dealerFormService.findDealerFormById(dealerFormId);
  }

  @UseGuards(AuthGuard, SuperAdminGuard)
  @Patch('/update/:id')
  updateDealerForm(
    @Param('id') dealerFormId: number,
    @Body() body: UpdateFormDto,
  ) {
    return this.dealerFormService.updateDealerForm(dealerFormId, body);
  }
}
