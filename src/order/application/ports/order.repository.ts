import { Order } from '../../domain/order.entity';
import { OrderRepositorySaveDTO } from '../dtos/order-repository-save.dto';

export abstract class IOrderRepository {
  abstract getOrder(id: string): Promise<Order | null>;
  abstract save(dto: OrderRepositorySaveDTO): Promise<string>;
}
