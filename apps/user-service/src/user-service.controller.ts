import { Controller } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { CreateUserDto } from 'apps/gateway/src/user/dto/create-user.dto';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/rmq';

@Controller()
export class UserServiceController {
  constructor(
    private readonly userServiceService: UserServiceService,
    private readonly rmqService: RmqService,
  ) {
    console.log(rmqService);
  }

  @MessagePattern('createUser')
  createUser(createUserDto: CreateUserDto, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.userServiceService.createUser(createUserDto);
  }

  @MessagePattern('getUser')
  getUser(@Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    const uesr = this.userServiceService.getUser();
    return uesr;
  }
}