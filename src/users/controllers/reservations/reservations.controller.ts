import {
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/currentUser/guards/auth.guard';
import { CurrentUser } from 'src/currentUser/decorators/current-user.decorator';
import { Client } from 'src/users/entities/client.entity';
import { ReservationsService } from 'src/users/services/reservations/reservations.service';
import { ClientGuard } from 'src/currentUser/guards/client.guard';

@Controller('reservations')
@UseGuards(AuthGuard, ClientGuard)
export class ReservationsController {
  constructor(
    private reservationsService: ReservationsService,
  ) {}

  @Patch('/addItem/:itemId')
  addItem(@CurrentUser() client: Client, @Param('itemId') itemId: number) {
    return this.reservationsService.addItem(client, itemId);
  }

  @Patch('/removeItem/:itemId')
  removeItem(@CurrentUser() client: Client, @Param('itemId') itemId: number) {
    return this.reservationsService.removeItem(client, itemId);
  }
  
}
