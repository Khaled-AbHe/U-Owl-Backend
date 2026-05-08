import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from '../../entities/order-item.entity';
import { Vehicle } from '../../../vehicles/entities/vehicle.entity';
import { VehiclesService } from '../../../vehicles/services/vehicles.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem) private orderItemsRepo: Repository<OrderItem>,
    private vehiclesService: VehiclesService,
  ) {}

  async findOrderItemById(orderItemId: number) {
    const orderItem = await this.orderItemsRepo.findOneBy({ orderItemId });

    if (!orderItem) {
      throw new BadRequestException('The order item doesnt exist');
    }

    return orderItem;
  }

  async createOrderItem(data: { vehicle: Vehicle; clientDistance: number }) {
    const itemPrice =
      Math.ceil(data.clientDistance * data.vehicle.costPerKm * 100) / 100;
    const updatedVehicle = await this.vehiclesService.setVehicleAsReserved(
      data.vehicle,
    );

    return await this.orderItemsRepo.save(
      this.orderItemsRepo.create({
        vehicle: updatedVehicle,
        itemPrice: itemPrice,
      }),
    );
  }

  async removeOrderItem(orderItemId: number) {
    const orderItem = await this.findOrderItemById(orderItemId);
    await this.vehiclesService.setVehicleAsAvailable(orderItem.vehicle);
    return await this.orderItemsRepo.remove(orderItem);
  }
}
