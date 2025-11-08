import { Command } from '@nestjs/cqrs';
import { CreateOrderResponseDto } from '../dtos/create-order-response.dto';

export class CreateOrderCommand extends Command<CreateOrderResponseDto> {
  constructor(
    public customerId: string,
    public totalAmount: number,
  ) {
    super();
  }
}
