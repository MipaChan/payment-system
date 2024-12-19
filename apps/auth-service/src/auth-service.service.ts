import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '@app/entity';
import { ClientProxy } from '@nestjs/microservices';

export interface TokenPayload {
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject('USER') private userProxy: ClientProxy,                  
  ) {
    
   }

  async login(user: User) {
    const tokenPayload: TokenPayload = {
      email: user.email,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);
    return {
      access_token: token,
      expires_in: expires.getTime() - new Date().getTime(),
    };
  }

  async logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }

  async validateToken(token: string): Promise<TokenPayload> {
    
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
