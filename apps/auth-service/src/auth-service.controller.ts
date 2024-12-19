import { Controller, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { CurrentUser } from './current-user.decorator';
import { User } from '@app/entity'
import { Response } from 'express';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RmqService } from '@app/rmq';

@Controller('auth')
export class AuthServiceController {
  constructor(
    private readonly authService: AuthService,
    private readonly rmqService: RmqService,
  ) { 
  }


  @MessagePattern('login')
  async login(
    @Ctx() context: RmqContext,
    @CurrentUser() user: User,
  ) {
    this.rmqService.ack(context);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);
    return { message: 'Successfully logged out' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    return user;
  }

  @MessagePattern('verify_token')
  async verifyToken(@Payload() token: string) {
    return this.authService.validateToken(token);
  }
}
