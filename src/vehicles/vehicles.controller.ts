import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateVehicleDto } from './dtos/create-vehicule.dto';
import { UpdateVehicleDto } from './dtos/update-vehicule.dto';
import { VehiclesService } from './services/vehicles.service';
import { AdminGuard } from '../currentUser/guards/admin.guard';
import { AuthGuard } from '../currentUser/guards/auth.guard';

@Controller('vehicles')
@UseGuards(AuthGuard, AdminGuard)
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Post('/create')
  createVehicle(@Body() body: CreateVehicleDto) {
    return this.vehiclesService.factoryCreate(body);
  }

  @Get('/all')
  findAllVehicles() {
    return this.vehiclesService.findAllVehicles();
  }

  @Get('/trucks')
  findAllTrucks() {
    return this.vehiclesService.findAllTrucks();
  }

  @Get('/trailers')
  findAllTrailers() {
    return this.vehiclesService.findAllTrailers();
  }

  // temp
  @Get('/:id')
  findVehicleById(@Param('id') id: number) {
    return this.vehiclesService.findVehicleById(id);
  }

  @Get('/:id/roadSafe')
  isRoadSafe(@Param('id') id: number) {
    return this.vehiclesService.isRoadSafe(id);
  }

  @Delete('/:id')
  deleteVehicleById(@Param('id') vehicleId: number) {
    return this.vehiclesService.deleteVehicleById(vehicleId);
  }

  @Patch('/:id')
  updateVehicle(@Param('id') vehicleId: number, @Body() body: UpdateVehicleDto) {
    return this.vehiclesService.updateVehicle(vehicleId, body);
  }
}
