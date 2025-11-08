import { DynamicModule, Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { OrderInfrastructureModule } from './order/infrastructure/order-infrastructure.module';

export type BootstrapConfig = {
  persistenceDriver: 'in-memory' | 'typeorm';
};

@Module({})
export class AppModule {
  static register(options: BootstrapConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [
        OrderModule.withInfrastructure(
          OrderInfrastructureModule.use(options.persistenceDriver),
        ),
      ],
    };
  }
}
