import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentServiceService } from './payment-service.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller()
export class PaymentServiceController {
  constructor(private readonly paymentService: PaymentServiceService) {}

  @MessagePattern('createPayment')
  async createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @MessagePattern('getPaymentStatus')
  async getPaymentStatus(@Payload() paymentId: string) {
    return this.paymentService.getPaymentStatus(paymentId);
  }

  @MessagePattern('processPayment')
  async processPayment(@Payload() paymentId: string) {
    return this.paymentService.processPayment(paymentId);
  }
}
