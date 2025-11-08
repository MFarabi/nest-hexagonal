import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderHandler } from './application/commands/create-order.handler';
import { OrderController } from './presenters/order.controller';
import { OrderService } from './application/order.service';
import { DynamicModule, Module } from '@nestjs/common';
import { OrderInfrastructureModule } from './infrastructure/order-infrastructure.module';

export type BootstrapConfig = {
  persistenceDriver: 'in-memory' | 'typeorm';
};

@Module({})
export class OrderModule {
  static register(config: BootstrapConfig): DynamicModule {
    return {
      module: OrderModule,
      imports: [
        CqrsModule.forRoot(),
        OrderInfrastructureModule.use(config.persistenceDriver),
      ],
      providers: [OrderService, CreateOrderHandler],
      controllers: [OrderController],
    };
  }
}
