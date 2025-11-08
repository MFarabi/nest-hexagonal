import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { OrderService } from '../application/order.service';
import { CreateOrderRequestDTO } from '../application/dtos/create-order-request.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../application/commands/create-order.command';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateOrderResponseDto } from '../application/dtos/create-order-response.dto';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @ApiOkResponse({ type: () => CreateOrderResponseDto })
  async create(
    @Body() dto: CreateOrderRequestDTO,
  ): Promise<CreateOrderResponseDto> {
    return this.commandBus.execute(
      new CreateOrderCommand(dto.customerId, dto.totalAmount),
    );
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    const order = await this.orderService.getOrderById(id);
    return {
      id: order.id,
      customerId: order.customerId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  @Patch(':id/confirm')
  async confirm(@Param('id') id: string) {
    await this.orderService.confirmOrder(id);
    return { message: 'Order confirmed' };
  }
}
