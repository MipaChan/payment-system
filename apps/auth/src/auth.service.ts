import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuth(str: string): string {
    console.log(str);
    return str + 'Hello World!';
  }
}
