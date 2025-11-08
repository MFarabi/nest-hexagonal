import { ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';
import { IOrderRepository } from '../ports/order.repository';
import { Order } from 'src/order/domain/order.entity';

import { OrderRepositorySaveDTO } from '../dtos/order-repository-save.dto';
import { CreateOrderResponseDto } from '../dtos/create-order-response.dto';

export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async execute({
    customerId,
    totalAmount,
  }: CreateOrderCommand): Promise<CreateOrderResponseDto> {
    const order = Order.create(customerId, totalAmount);

    const saveDTO: OrderRepositorySaveDTO = {
      id: order.id,
      customerId: order.customerId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    await this.orderRepository.save(saveDTO);

    return new CreateOrderResponseDto(order.id);
  }
}
