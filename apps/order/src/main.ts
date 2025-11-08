import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OrderModule } from './order.module';

async function bootstrap() {
  const app = await NestFactory.create(
    OrderModule.register({
      persistenceDriver: 'typeorm',
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Orders example')
    .setDescription('The orders API description')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
