import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/rmq';
import { TransactionServiceModule } from './transaction-service.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TransactionServiceModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('TRANSACTION'));
  app.useGlobalPipes(new ValidationPipe());
  
  await app.startAllMicroservices();
  await app.listen(3003);
}
bootstrap();
