import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'order-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
