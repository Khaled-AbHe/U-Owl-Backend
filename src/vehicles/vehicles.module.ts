import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './services/vehicles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Truck } from './entities/truck.entity';
import { Van } from './entities/van.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Truck, Van])],
  exports: [VehiclesService],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
