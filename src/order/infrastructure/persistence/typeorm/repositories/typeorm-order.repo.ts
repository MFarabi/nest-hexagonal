import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrderRepository } from '../../../../application/ports/order.repository';
import { Order, OrderStatus } from '../../../../domain/order.entity';
import { OrderRepositorySaveDTO } from '../../../../application/dtos/order-repository-save.dto';
import { TypeormOrder } from '../entities/typeorm-order.entity';

@Injectable()
export class TypeOrmOrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(TypeormOrder)
    private readonly repository: Repository<TypeormOrder>,
  ) {}

  async getOrder(id: string): Promise<Order | null> {
    const typeormOrder = await this.repository.findOne({ where: { id } });

    if (!typeormOrder) {
      return null;
    }

    Logger.log(typeormOrder.id, 'TypeOrmOrderRepo:GET');
    return this._toDomain(typeormOrder);
  }

  async save(dto: OrderRepositorySaveDTO): Promise<string> {
    const { id } = await this.repository.save({
      id: dto.id,
      customerId: dto.customerId,
      totalAmount: dto.totalAmount,
      status: dto.status,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });

    Logger.log(dto.id, 'TypeOrmOrderRepo:SAVED');
    return id;
  }

  private _toDomain(typeormOrder: TypeormOrder): Order {
    const { createdAt, customerId, id, status, totalAmount, updatedAt } =
      typeormOrder;
    return new Order({
      createdAt,
      customerId,
      id,
      status: status as OrderStatus,
      totalAmount,
      updatedAt,
    });
  }
}
