import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLocationDto } from './dtos/create-location.dto';
import { LocationsService } from './services/locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Post('/create')
  createLocation(@Body() body: CreateLocationDto) {
    return this.locationsService.createLocation(body);
  }

  @Get('/all')
  findAllLocations() {
    return this.locationsService.findAllLocations();
  }
}
