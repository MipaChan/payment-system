import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth-service.module';
import { RmqService } from '@app/rmq'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('AUTH', false, {
    prefetchCount: 1,
    heartbeat: 60,
  }));
  
  await app.startAllMicroservices();
}

bootstrap();
