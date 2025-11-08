import { BadRequestException, Injectable } from '@nestjs/common';
import { Order } from '../domain/order.entity';
import { CreateOrderRequestDTO } from './dtos/create-order-request.dto';
import { OrderRepositorySaveDTO } from './dtos/order-repository-save.dto';
import { IOrderRepository } from './ports/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.getOrder(id);
    if (!order) {
      throw new BadRequestException(`Order with id ${id} not found`);
    }

    return order;
  }

  async createOrder(dto: CreateOrderRequestDTO): Promise<string> {
    const order = Order.create(dto.customerId, dto.totalAmount);

    const saveDTO: OrderRepositorySaveDTO = {
      id: order.id,
      customerId: order.customerId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    await this.orderRepository.save(saveDTO);

    return order.id;
  }

  async confirmOrder(id: string): Promise<void> {
    const order = await this.getOrderById(id);

    order.confirm();

    await this.orderRepository.save({
      id: order.id,
      customerId: order.customerId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  }
}
