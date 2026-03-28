import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { VehiculesService } from './services/vehicules.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiculesService: VehiculesService) {}

  @Post('/create')
  createVehicle(@Body() body: CreateVehiculeDto) {
    return this.vehiculesService.factoryCreate(body);
  }

  @Get('/all')
  findAllVehicles() {
    return this.vehiculesService.findAllVehicles();
  }

  @Get('/trucks')
  findAllTrucks() {
    return this.vehiculesService.findAllTrucks();
  }

  @Get('/vans')
  findAllVans() {
    return this.vehiculesService.findAllVans();
  }
}