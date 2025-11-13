export class OrderCreatedEvent {
  constructor(public orderId: string) {}

  toString() {
    return JSON.stringify({
      orderId: this.orderId,
    });
  }
}
