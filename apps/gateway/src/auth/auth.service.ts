import { Inject, Injectable } from '@nestjs/common';
import { AuthParamDto } from './dto/auth-param.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH') private authProxy: ClientProxy,
  ) { }

  login(authParamDto: AuthParamDto) {
    return this.authProxy.send('login', authParamDto);
  }
}
