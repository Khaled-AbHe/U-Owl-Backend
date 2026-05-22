import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LocationsController } from './controllers/locations.controller';
import { LocationsService } from './services/location/locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { MaptilerService } from './services/maptiler/maptiler.service';

@Module({
  imports: [
    HttpModule, // provides HttpService for GeocodingService
    VehiclesModule,
    TypeOrmModule.forFeature([Location]),
  ],
  exports: [LocationsService],
  controllers: [LocationsController],
  providers: [LocationsService, MaptilerService],
})
export class LocationsModule {}
