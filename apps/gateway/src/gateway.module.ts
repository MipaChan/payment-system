import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RmqModule } from '@app/rmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/gateway/.env',
    }),
    UserModule,
    RmqModule.register({
      name: 'AUTH',
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }
