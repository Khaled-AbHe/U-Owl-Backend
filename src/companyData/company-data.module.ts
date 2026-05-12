import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealerFormController } from './controller/dealer-form.controller';
import { DealerFormService } from './services/dealerForm.service';
import { DealerForm } from './entities/dealer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DealerForm])],
  controllers: [DealerFormController],
  providers: [DealerFormService],
})
export class CompanyDataModule {}
