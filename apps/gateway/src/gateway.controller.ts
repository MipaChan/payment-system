import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService
  ) { }

  @Get()
  getAuth(@Param('str') str: string): Observable<string> {
    return this.gatewayService.getAuth(str);
  }
}
