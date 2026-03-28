import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVehicleDto } from './dtos/create-vehicule.dto';
import { VehiclesService } from './services/vehicles.service';

@Controller('vehicles')
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

  @Get('/vans')
  findAllVans() {
    return this.vehiclesService.findAllVans();
  }
}
