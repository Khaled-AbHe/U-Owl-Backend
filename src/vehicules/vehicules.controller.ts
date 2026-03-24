import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehiculesService } from './vehicules.service';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';

@Controller('vehicules')
export class VehiculesController {
  private constructor(private readonly vehiculesService: VehiculesService) {}
}
