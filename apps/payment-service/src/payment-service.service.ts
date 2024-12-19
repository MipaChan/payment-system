import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatus } from './enums/payment-status.enum';

@Injectable()
export class PaymentServiceService {
  constructor(
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    return await this.paymentModel.create({
      ...createPaymentDto,
      status: PaymentStatus.PENDING,
    });
  }

  async getPaymentStatus(paymentId: string) {
    const payment = await this.paymentModel.findOne({
      where: { id: paymentId },
    });
    return payment?.status;
  }

  async processPayment(paymentId: string) {
    const payment = await this.paymentModel.findOne({
      where: { id: paymentId },
    });
    
    if (!payment) {
      throw new Error('Payment not found');
    }

    // Here you would integrate with actual payment processing service
    // For now, we'll simulate a successful payment
    payment.status = PaymentStatus.COMPLETED;
    payment.processedAt = new Date();
    
    return await payment.save();
  }
}
