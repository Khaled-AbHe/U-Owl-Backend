import { Module } from '@nestjs/common';
import { DealerFormController } from './controller/dealer-form.controller';
import { DealerService } from './services/dealerForm/dealerForm.service';

@Module({
  controllers: [DealerFormController],
  providers: [DealerService]
})
export class CompanyDataModule {}
