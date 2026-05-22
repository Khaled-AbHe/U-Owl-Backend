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
import { CreateVehicleDto } from './dtos/create-vehicule.dto';
import { UpdateVehicleDto } from './dtos/update-vehicule.dto';
import { VehiclesService } from './services/vehicles.service';
import { AdminGuard } from '../currentUser/guards/admin.guard';
import { AuthGuard } from '../currentUser/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Get('/:id/roadSafe')
  isRoadSafe(@Param('id') id: number) {
    return this.vehiclesService.isRoadSafe(id);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  deleteVehicleById(@Param('id') vehicleId: number) {
    return this.vehiclesService.deleteVehicleById(vehicleId);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  updateVehicle(
    @Param('id') vehicleId: number,
    @Body() body: UpdateVehicleDto,
  ) {
    return this.vehiclesService.updateVehicle(vehicleId, body);
  }
}
