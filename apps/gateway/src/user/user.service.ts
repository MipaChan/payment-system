import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {

  constructor(
    @Inject('USER') private userProxy: ClientProxy,
  ) { }
  create(createUserDto: CreateUserDto) {
    return this.userProxy.send('createUser', createUserDto);
  }

}
