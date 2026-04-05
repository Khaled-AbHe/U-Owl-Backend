import { Injectable, NotFoundException } from '@nestjs/common';
import { CartsService } from 'src/carts/services/carts/carts.service';
import { Client } from 'src/users/entities/client.entity';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';
import { OrderItemsService } from '../order-items/order-items.service';

@Injectable()
export class ReservationsService {
  constructor(
    private cartsService: CartsService,
    private vehiclesService: VehiclesService,
    private orderItemsService: OrderItemsService,
  ) {}

  async addVehicleToCart(
    client: Client,
    data: { vehicleId: number; distance: number },
  ) {
    const cart = await this.cartsService.findById(client.cart.cartId);
    const vehicle = await this.vehiclesService.findVehicleById(data.vehicleId);
    const orderItem = await this.orderItemsService.createOrderItem({
      vehicle: vehicle,
      clientDistance: data.distance,
    });

    cart.orderItems.push(orderItem);
    const cartTotal = cart.totalPrice + orderItem.itemPrice;

    return await this.cartsService.updateCart(cart.cartId, {
      ...cart,
      totalPrice: cartTotal,
    });
  }

  async removeVehicleFromCart(client: Client, orderItemId: number) {
    const cart = await this.cartsService.findById(client.cart.cartId);
    const orderItem =
      await this.orderItemsService.findOrderItemById(orderItemId);

    const itemIndex = cart.orderItems.findIndex((item) => {
      return item.orderItemId == orderItem.orderItemId;
    });

    if (itemIndex === -1) {
      throw new NotFoundException('This vehicle is not in your cart');
    }

    const updatedOrderItems = cart.orderItems.toSpliced(itemIndex, 1);
    const updatedTotalPrice = cart.totalPrice - orderItem.itemPrice;
    await this.orderItemsService.removeOrderItem(orderItem.orderItemId);

    return this.cartsService.updateCart(cart.cartId, {
      orderItems: updatedOrderItems,
      totalPrice: updatedTotalPrice,
    });
  }
}
