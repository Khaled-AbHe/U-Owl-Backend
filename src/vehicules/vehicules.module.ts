import { Module } from '@nestjs/common';
import { VehiculesController } from './vehicules.controller';
import { VehiculesService } from './services/vehicules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicule } from './entities/vehicule.entity';
import { Truck } from './entities/truck.entity';
import { Van } from './entities/van.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicule, Truck, Van])],
  exports: [VehiculesService],
  controllers: [VehiculesController],
  providers: [VehiculesService],
})
export class VehiculesModule {}