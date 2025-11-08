import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { OrderService } from '../application/order.service';
import { CreateOrderRequestDTO } from '../application/dtos/create-order-request.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() dto: CreateOrderRequestDTO) {
    const orderId = await this.orderService.createOrder(dto);
    return { orderId };
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
