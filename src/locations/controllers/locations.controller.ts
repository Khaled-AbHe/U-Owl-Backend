import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { addVehicleToLocationDto } from '../dtos/add-vehicle-to-location.dto';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { removeVehicleFromLocationDto } from '../dtos/remove-vehicleFromLocation.dto';
import { LocationsService } from '../services/location/locations.service';
import { UpdateLocationDto } from '../dtos/update-location.dto';
import { AdminGuard } from '../../currentUser/guards/admin.guard';
import { AuthGuard } from '../../currentUser/guards/auth.guard';
import { SuperAdminGuard } from '../../currentUser/guards/super-admin.guard';

@UseGuards(AuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @UseGuards(SuperAdminGuard)
  @Post('/create')
  createLocation(@Body() body: CreateLocationDto) {
    return this.locationsService.createLocation(body);
  }

  @Get('/all')
  findAllLocations() {
    return this.locationsService.findAllLocations();
  }

  @UseGuards(AdminGuard)
  @Post('/addVehicle')
  addVehicleToLocation(@Body() body: addVehicleToLocationDto) {
    return this.locationsService.addVehicleToLocation(body);
  }

  @UseGuards(AdminGuard)
  @Patch('/removeVehicle')
  removeVehicleFromLocation(@Body() body: removeVehicleFromLocationDto) {
    return this.locationsService.removeVehicleFromLocation(body);
  }

  @UseGuards(SuperAdminGuard)
  @Delete('/:id')
  deleteLocationById(@Param('id') locationId: number) {
    return this.locationsService.deleteLocationById(locationId);
  }

  @Get('/:id/vehicles')
  getAllVehiclesFromLocation(@Param('id') locationId: number) {
    return this.locationsService.getAllVehiclesFromLocation(locationId);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  async updateLocation(
    @Param('id') locationId: number,
    @Body() body: UpdateLocationDto,
  ) {
    return await this.locationsService.updateLocation(locationId, body);
  }
}
