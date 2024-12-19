import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_SERVICE') private transactionClient: ClientProxy,
  ) {}

  async createTransaction(createTransactionDto: any) {
    return lastValueFrom(
      this.transactionClient.send('createTransaction', createTransactionDto),
    );
  }

  async findAllTransactions() {
    return lastValueFrom(
      this.transactionClient.send('findAllTransactions', {}),
    );
  }

  async findTransactionsByUserId(userId: string) {
    return lastValueFrom(
      this.transactionClient.send('findTransactionsByUserId', userId),
    );
  }

  async findTransactionByPaymentId(paymentId: string) {
    return lastValueFrom(
      this.transactionClient.send('findTransactionByPaymentId', paymentId),
    );
  }

  async updateTransactionStatus(id: string, status: string) {
    return lastValueFrom(
      this.transactionClient.send('updateTransactionStatus', { id, status }),
    );
  }

  async findTransactionsByDateRange(startDate: Date, endDate: Date) {
    return lastValueFrom(
      this.transactionClient.send('findTransactionsByDateRange', {
        startDate,
        endDate,
      }),
    );
  }
}
