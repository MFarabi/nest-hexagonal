import { Injectable, Logger } from '@nestjs/common';
import { OrderRepositorySaveDTO } from '../../../../application/dtos/order-repository-save.dto';
import { IOrderRepository } from '../../../../application/ports/order.repository';
import { Order, OrderStatus } from '../../../../domain/order.entity';
import { InMemoryOrder } from '../entities/in-memory.entity';

@Injectable()
export class InMemoryOrderRepository implements IOrderRepository {
  private store = new Map<string, InMemoryOrder>();

  async getOrder(id: string): Promise<Order | null> {
    const inmemEntity = this.store.get(id);

    if (!inmemEntity) {
      return null;
    }

    Logger.log(inmemEntity.id, 'InMemoryOrderRepo:GET');
    return this._toDomain(inmemEntity);
  }

  async save(dto: OrderRepositorySaveDTO): Promise<string> {
    const inmemEntity: InMemoryOrder = {
      id: dto.id,
      customerId: dto.customerId,
      totalAmount: dto.totalAmount,
      status: dto.status,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
    this.store.set(dto.id, inmemEntity);
    Logger.log(inmemEntity.id, 'InMemoryOrderRepo:SAVED');
    return inmemEntity.id;
  }

  private _toDomain(order: InMemoryOrder): Order {
    const { createdAt, customerId, id, status, totalAmount, updatedAt } = order;
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
