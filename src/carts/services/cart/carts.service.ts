import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../cart.entity';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private repo: Repository<Cart>,
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
    return await this.updateCart(id, {...cart, items: []});
  }
}
