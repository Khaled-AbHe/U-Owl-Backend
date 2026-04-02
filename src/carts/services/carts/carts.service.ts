import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../entities/cart.entity';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    private vehiclesService: VehiclesService,
  ) {}

  async findAllCarts() {
    return await this.cartRepo.find();
  }

  async findById(cartId: number) {
    const cart = await this.cartRepo.findOneBy({ cartId });

    if (!cart) {
      throw new NotFoundException("Cart doesn't exist.");
    }

    return cart;
  }

  async updateCart(cartId: number, attrs: Partial<Cart>) {
    const cart = await this.findById(cartId);
    Object.assign(cart, attrs);
    return await this.cartRepo.save(cart);
  }

  async clearCart(cartId: number) {
    const cart = await this.findById(cartId);

    cart.items.forEach((vehicle) => {
      this.vehiclesService.updateStatus(vehicle.vehicleId, {
        ...vehicle,
        isReserved: false,
      });
    });

    return await this.updateCart(cartId, { ...cart, items: [] });
  }

  async isEmpty(cartId: number) {
    const cart = await this.findById(cartId);
    return cart.items.length == 0
  }
}
