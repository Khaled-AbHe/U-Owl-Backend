import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cart } from 'src/carts/entities/cart.entity';
import { CartsService } from 'src/carts/services/carts/carts.service';
import { Client } from 'src/users/entities/client.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';

@Injectable()
export class ReservationsService {
  constructor(
    private cartsService: CartsService,
    private vehiclesService: VehiclesService,
  ) {}

  async addItem(client: Client, itemId: number) {
    const { cart, item } = await this.getData(client, itemId);

    const updatedCart = await this.addVehicleToCart(cart, item);

    return await this.cartsService.updateCart(cart.cartId, updatedCart);
  }

  async removeItem(client: Client, itemId: number) {
    const { cart, item } = await this.getData(client, itemId);

    const updatedCartItems = await this.removeVehicleFromCart(cart, item);

    return await this.cartsService.updateCart(cart.cartId, {
      ...cart,
      items: updatedCartItems,
    });
  }

  // Helper functions

  async getData(client: Client, itemId: number) {
    const cart: Cart = await this.cartsService.findById(client.cart.cartId); // cherche le panier
    const item: Vehicle = await this.vehiclesService.findVehicleById(itemId); // cherche le véhicule

    return { cart, item };
  }

  async addVehicleToCart(cart: Cart, vehicle: Vehicle) {
    if (vehicle.isReserved) {
      throw new ForbiddenException('This vehicle is already reserved');
    }

    const updatedVehicle = await this.vehiclesService.updateStatus(vehicle.vehicleId, {
      ...vehicle,
      isReserved: true,
    });

    cart.items.push(updatedVehicle);

    return cart;
  }

  async setVehicleAsReserved(vehicle: Vehicle) {
    return await this.vehiclesService.updateStatus(vehicle.vehicleId, {
      ...vehicle,
      isReserved: false,
    });
  }

  async removeVehicleFromCart(cart: Cart, vehicle: Vehicle) {
    console.log('function - removeVehicleFromCart');
    console.log(cart.items);
    const itemIndex = cart.items.findIndex((item) => {
      return item.vehicleId == vehicle.vehicleId;
    });

    if (itemIndex === -1) {
      throw new NotFoundException('This vehicle is not in your cart');
    }

    await this.vehiclesService.updateStatus(vehicle.vehicleId, {
      ...vehicle,
      isReserved: false,
    });

    return cart.items.toSpliced(itemIndex, 1);
  }

  // async removeAllVehiclesFromCart(cart: Cart) {
  //   console.log('function - removeVehicleFromCart');

  //   cart.items.forEach((vehicle) => {
  //     return this.setVehicleAsReserved(vehicle);
  //   });

  //   return cart.items.;
  // }
}
