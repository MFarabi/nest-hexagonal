import { ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';
import { IOrderRepository } from '../ports/order.repository';
import { OrderStatus } from 'src/order/domain/order.entity';
import { randomUUID } from 'crypto';

export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly orderRepository: IOrderRepository) {}
  async execute({
    customerId,
    totalAmount,
  }: CreateOrderCommand): Promise<{ orderId: string }> {
    const orderId = await this.orderRepository.save({
      id: randomUUID(),
      customerId: customerId,
      totalAmount,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { orderId };
  }
}
