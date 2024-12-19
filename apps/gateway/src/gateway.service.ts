import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('AUTH') private auth: ClientProxy,
  ) { }
  getAuth(str: string): Observable<string> {
    return this.auth.send('get_auth', { str: str, data: 'data' ,test: 'test' });
  }
}
