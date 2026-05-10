import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { LocationsController } from '../locations/controller/locations.controller';
import { LocationsService } from './services/locations.service';
import { Location } from '../locations/entities/location.entity';

@Module({
  imports: [VehiclesModule, TypeOrmModule.forFeature([Location])],
  exports: [],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
