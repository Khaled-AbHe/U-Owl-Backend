import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/carts/entities/order-item.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehiclesService } from 'src/vehicles/services/vehicles.service';
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
    const itemPrice = data.clientDistance * data.vehicle.costPerKm;
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
