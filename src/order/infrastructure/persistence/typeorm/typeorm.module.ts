import { Module } from '@nestjs/common';
import { IOrderRepository } from '../../../application/ports/order.repository';
import { TypeOrmOrderRepository } from './repositories/typeorm-order.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './typeorm.config';
import { TypeormOrder } from './entities/typeorm-order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([TypeormOrder]),
  ],
  providers: [
    {
      provide: IOrderRepository,
      useClass: TypeOrmOrderRepository,
    },
  ],
  exports: [IOrderRepository],
})
export class TypeormPersistanceModule {}
