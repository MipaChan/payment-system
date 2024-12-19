import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { CreateUserDto } from 'apps/gateway/src/user/dto/create-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  getHello(): string {
    return this.userServiceService.getHello();
  }
  
  @MessagePattern('createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userServiceService.createUser(createUserDto);
  }

}