import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { RmqService } from '@app/rmq';


async function bootstrap() {

  const app = await NestFactory.create(UserServiceModule);

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('USER'));
  await app.startAllMicroservices();

}
bootstrap();
