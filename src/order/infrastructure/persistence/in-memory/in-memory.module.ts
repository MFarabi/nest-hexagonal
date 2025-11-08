import { Module } from '@nestjs/common';
import { IOrderRepository } from '../../../application/ports/order.repository';
import { InMemoryOrderRepository } from './repositories/in-memory.order-repo';

@Module({
  providers: [
    {
      provide: IOrderRepository,
      useClass: InMemoryOrderRepository,
    },
  ],
  exports: [IOrderRepository],
})
export class InMemoryOrderPersistanceModule {}
