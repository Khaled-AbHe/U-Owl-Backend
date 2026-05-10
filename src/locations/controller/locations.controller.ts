import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { LocationsService } from '../services/locations.service';
import { addVehicleToLocationDto } from '../dtos/add-vehicle-to-location.dto';
import { removeVehicleFromLocationDto } from '../dtos/remove-vehicleFromLocation.dto';

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

  @Post('/addVehicle')
  addVehicleToLocation(@Body() body: addVehicleToLocationDto) {
    return this.locationsService.addVehicleToLocation(body);
  }

  @Patch('/removeVehicle')
  removeVehicleFromLocation(@Body() body: removeVehicleFromLocationDto) {
    return this.locationsService.removeVehicleFromLocation(body);
  }
}
