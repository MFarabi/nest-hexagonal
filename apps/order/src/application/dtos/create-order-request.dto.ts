import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderRequestDTO {
  constructor(customerId: string, totalAmount: number) {
    this.customerId = customerId;
    this.totalAmount = totalAmount;
  }
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  totalAmount: number;
}
