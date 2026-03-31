import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { VehiculesService } from './services/vehicules.service';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';

@Controller('vehicules')
export class VehiculesController {
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

  //à faire
  @Patch('/:id')
  modifyVehicule(@Param('id') id : string, @Body() body : UpdateVehiculeDto) {
    return this.vehiculesService.modifyVehicule(parseInt(id), body);
  }

  //à faire
  isRoadSafe() {

  }

  //à faire
  @Get('/:id')
  getVehiculeById(@Param('id') id : string) {
    return this.vehiculesService.getVehiculeById(parseInt(id));
  }

  //à faire
  @Delete('/:id')
  deleteVehiculeById(@Param('id') id : string) {
    return this.vehiculesService.deleteVehiculeById(parseInt(id));
  }
}