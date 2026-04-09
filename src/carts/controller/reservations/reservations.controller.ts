import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../currentUser/guards/auth.guard';
import { CurrentUser } from '../../../currentUser/decorators/current-user.decorator';
import { Client } from '../../../users/entities/client.entity';
import { ReservationsService } from '../../services/reservations/reservations.service';
import { ClientGuard } from '../../../currentUser/guards/client.guard';
import { ReserveVehicleDto } from '../../dtos/reserve-vehicle.dto';

@Controller('reservations')
@UseGuards(AuthGuard, ClientGuard)
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Patch('/addVehicle')
  addItem(@CurrentUser() client: Client, @Body() body: ReserveVehicleDto) {
    return this.reservationsService.addVehicleToCart(client, body);
  }

  @Patch('/removeOrderItem/:orderItemId')
  removeItem(
    @CurrentUser() client: Client,
    @Param('orderItemId') orderItemId: number,
  ) {
    return this.reservationsService.removeVehicleFromCart(client, orderItemId);
  }
}
