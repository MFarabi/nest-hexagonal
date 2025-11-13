import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule.register({
      persistenceDriver: 'typeorm',
    }),
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
      },
    },
  );

  // const config = new DocumentBuilder()
  //   .setTitle('Orders example')
  //   .setDescription('The orders API description')
  //   .setVersion('1.0')
  //   .addTag('orders')
  //   .build();
  // const documentFactory = () => SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen();
}
bootstrap()
  .then(() => {
    console.log('order service started');
  })
  .catch((error) => {
    console.error('Error starting order service:', error);
  });
