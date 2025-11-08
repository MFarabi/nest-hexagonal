export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export type OrderParams = {
  readonly id: string;
  readonly customerId: string;
  totalAmount: number;
  status: OrderStatus;
  readonly createdAt: Date;
  updatedAt: Date;
};

export class Order {
  constructor(private params: OrderParams) {}

  static create(customerId: string, totalAmount: number): Order {
    const now = new Date();
    return new Order({
      id: crypto.randomUUID(),
      customerId,
      totalAmount,
      status: OrderStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    });
  }

  confirm(): void {
    this.params.status = OrderStatus.CONFIRMED;
    this.params.updatedAt = new Date();
  }

  get id(): string {
    return this.params.id;
  }

  get customerId(): string {
    return this.params.customerId;
  }

  get totalAmount(): number {
    return this.params.totalAmount;
  }

  get status(): OrderStatus {
    return this.params.status;
  }

  get createdAt(): Date {
    return this.params.createdAt;
  }

  get updatedAt(): Date {
    return this.params.updatedAt;
  }
}
