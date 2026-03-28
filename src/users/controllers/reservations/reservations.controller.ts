import {
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from 'src/carts/services/payment/payment.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Client } from 'src/users/entities/client.entity';
import { ReservationsService } from 'src/users/services/reservations/reservations.service';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
  constructor(
    private reservationsService: ReservationsService,
    private paymentService: PaymentService,
  ) {}

  @Patch('/addItem/:itemId')
  addItem(@CurrentUser() client: Client, @Param('itemId') itemId: number) {
    return this.reservationsService.addItem(client, itemId);
  }

  @Patch('/removeItem/:itemId')
  removeItem(@CurrentUser() client: Client, @Param('itemId') itemId: number) {
    return this.reservationsService.removeItem(client, itemId);
  }

  @Post('/pay')
  payCartTotal(
    @CurrentUser() client: Client,
    @Query('type') type: string,
    @Query('amount', ParseIntPipe) amount: number,
  ) {
    return this.paymentService.payForCart(client.cart.id, type, amount);
  }
}
