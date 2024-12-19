import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { TransactionServiceModule } from './transaction-service.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TransactionServiceModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3003,
    },
  });

  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
