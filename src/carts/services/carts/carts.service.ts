import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../entities/cart.entity';
import { Repository } from 'typeorm';
import { OrderItemsService } from '../order-items/order-items.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    private orderItemsService: OrderItemsService,
  ) {}

  // CRUD

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

  // OTHER

  async clearCart(cart: Cart) {
    await Promise.all(
      cart.orderItems.map((item) =>
        this.orderItemsService.removeOrderItem(item.orderItemId),
      ),
    );

    return await this.updateCart(cart.cartId, {
      orderItems: [],
      totalPrice: 0,
    });
  }

  async isEmpty(cartId: number) {
    const cart = await this.findById(cartId);
    return cart.orderItems.length == 0;
  }
}
