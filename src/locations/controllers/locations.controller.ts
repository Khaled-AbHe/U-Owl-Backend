import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { addVehicleToLocationDto } from '../dtos/add-vehicle-to-location.dto';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { removeVehicleFromLocationDto } from '../dtos/remove-vehicleFromLocation.dto';
import { LocationsService } from '../services/location/locations.service';

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

  @Delete('/:id')
  deleteUserById(@Param('id') locationId: number) {
    return this.locationsService.deleteLocationById(locationId);
  }
}
