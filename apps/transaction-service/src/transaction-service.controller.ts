import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionServiceService } from './transaction-service.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller()
export class TransactionServiceController {
  constructor(private readonly transactionService: TransactionServiceService) {}

  @MessagePattern('createTransaction')
  async create(@Payload() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @MessagePattern('findAllTransactions')
  async findAll() {
    return this.transactionService.findAll();
  }

  @MessagePattern('findTransactionsByUserId')
  async findByUserId(@Payload() userId: string) {
    return this.transactionService.findByUserId(userId);
  }

  @MessagePattern('findTransactionByPaymentId')
  async findByPaymentId(@Payload() paymentId: string) {
    return this.transactionService.findByPaymentId(paymentId);
  }

  @MessagePattern('updateTransactionStatus')
  async updateStatus(
    @Payload() data: { id: string; status: string },
  ) {
    return this.transactionService.updateStatus(data.id, data.status);
  }

  @MessagePattern('findTransactionsByDateRange')
  async findByDateRange(
    @Payload() data: { startDate: Date; endDate: Date },
  ) {
    return this.transactionService.findByDateRange(data.startDate, data.endDate);
  }
}
