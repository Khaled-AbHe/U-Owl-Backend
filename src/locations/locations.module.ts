import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './services/locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [VehiclesModule, TypeOrmModule.forFeature([Location])],
  exports: [],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
