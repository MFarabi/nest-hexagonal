import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryOrderPersistanceModule } from './persistence/in-memory/in-memory.module';
import { TypeormPersistanceModule } from './persistence/typeorm/typeorm.module';
import { BootstrapConfig } from '../order.module';

@Module({})
export class OrderInfrastructureModule {
  static use(driver: BootstrapConfig['persistenceDriver']): DynamicModule {
    const persistenceModule =
      driver === 'in-memory'
        ? InMemoryOrderPersistanceModule
        : TypeormPersistanceModule;

    return {
      module: OrderInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
