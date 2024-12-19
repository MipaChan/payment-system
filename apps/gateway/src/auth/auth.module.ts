import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RmqModule } from '@app/rmq';

@Module({
  imports: [
    RmqModule.register({
      name: 'AUTH',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
