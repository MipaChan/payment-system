import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/rmq';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/gateway/.env',
    }),
    RmqModule.register({ name: 'AUTH' }),
    RmqModule.register({ name: 'USER' }),
    RmqModule.register({ name: 'PAYMENT' }),
    RmqModule.register({ name: 'TRANSACTION' }),
  ],
  controllers: [
    GatewayController,
    AuthController,
    UserController,
    TransactionController,
  ],
  providers: [
    GatewayService,
    AuthService,
    UserService,
    TransactionService,
  ],
})
export class GatewayModule {}
