import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './services/locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Vehicle])],
  exports: [],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
