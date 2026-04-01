import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../cart.entity';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private repo: Repository<Cart>,
    private vehiclesService: VehiclesService,
  ) {}

  async findAllCarts() {
    return await this.repo.find();
  }

  async findById(id: number) {
    const cart = await this.repo.findOneBy({ id });

    if (!cart) {
      throw new NotFoundException("Cart doesn't exist.");
    }

    return cart;
  }

  async updateCart(id: number, attrs: Partial<Cart>) {
    const cart = await this.findById(id);
    Object.assign(cart, attrs);
    return await this.repo.save(cart);
  }

  async clearCart(id: number) {
    const cart = await this.findById(id);

    cart.items.forEach((vehicle) => {
      this.vehiclesService.updateStatus(vehicle.id, {
        ...vehicle,
        isReserved: false,
      });
    });

    return await this.updateCart(id, { ...cart, items: [] });
  }
}
