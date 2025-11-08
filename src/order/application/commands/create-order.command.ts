import { Command } from '@nestjs/cqrs';

export class CreateOrderCommand extends Command<{ orderId: string }> {
  constructor(
    public customerId: string,
    public totalAmount: number,
  ) {
    super();
  }
}
