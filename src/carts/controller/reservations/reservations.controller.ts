import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/currentUser/guards/auth.guard';
import { CurrentUser } from 'src/currentUser/decorators/current-user.decorator';
import { Client } from 'src/users/entities/client.entity';
import { ReservationsService } from 'src/carts/services/reservations/reservations.service';
import { ClientGuard } from 'src/currentUser/guards/client.guard';
import { ReserveVehicleDto } from 'src/carts/dtos/reserve-vehicle.dto';

@Controller('reservations')
@UseGuards(AuthGuard, ClientGuard)
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Patch('/addVehicle')
  addItem(@CurrentUser() client: Client, @Body() body: ReserveVehicleDto) {
    return this.reservationsService.addVehicleToCart(client, body);
  }

  @Patch('/removeVehicle/:orderItemId')
  removeItem(
    @CurrentUser() client: Client,
    @Param('orderItemId') orderItemId: number,
  ) {
    return this.reservationsService.removeVehicleFromCart(client, orderItemId);
  }
}
