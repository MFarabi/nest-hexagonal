import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderResponseDto {
  constructor(orderId: string) {
    this.orderId = orderId;
  }
  @ApiProperty()
  orderId: string;
}
