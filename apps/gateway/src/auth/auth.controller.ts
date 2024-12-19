import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthParamDto } from './dto/auth-param.dto';
import { lastValueFrom } from 'rxjs';
import { LocalAuthGuard } from '../../../auth-service/src/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async create(@Body() authParamDto: AuthParamDto) {
    const response = await lastValueFrom(this.authService.login(authParamDto));
    return response;
  }
}
