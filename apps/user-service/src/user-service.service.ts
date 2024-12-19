import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'apps/gateway/src/user/dto/create-user.dto';

@Injectable()
export class UserServiceService {
  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
