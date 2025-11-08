import { DynamicModule, Module } from '@nestjs/common';
import { OrderService } from './application/order.service';
import { OrderController } from './presenters/order.controller';
import { CreateOrderHandler } from './application/commands/create-order.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule.forRoot()],
  providers: [OrderService, CreateOrderHandler],
  controllers: [OrderController],
})
export class OrderModule {
  static withInfrastructure(infraModule: DynamicModule): DynamicModule {
    return {
      module: OrderModule,
      imports: [infraModule],
    };
  }
}
