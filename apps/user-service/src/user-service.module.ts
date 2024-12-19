import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { RmqModule } from '@app/rmq';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/user-service/.env',
    }), RmqModule],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule { }
