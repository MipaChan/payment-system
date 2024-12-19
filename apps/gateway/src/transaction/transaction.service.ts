import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout, catchError } from 'rxjs';
import { TimeoutError } from 'rxjs/internal/operators/timeout';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION') private transactionClient: ClientProxy,
  ) {}

  async createTransaction(createTransactionDto: any) {
    try {
      const response = await lastValueFrom(
        this.transactionClient.send('createTransaction', createTransactionDto)
          .pipe(
            timeout(5000), // 5 second timeout
            catchError(err => {
              if (err instanceof TimeoutError) {
                throw new Error('Transaction service timeout');
              }
              throw err;
            })
          )
      );
      return response;
    } catch (error) {
      console.error('Error in transaction service:', error);
      throw error;
    }
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
    try {
      const response = await lastValueFrom(
        this.transactionClient.send('updateTransactionStatus', { id, status })
          .pipe(
            timeout(5000),
            catchError(err => {
              if (err instanceof TimeoutError) {
                throw new Error('Transaction status update timeout');
              }
              throw err;
            })
          )
      );
      return response;
    } catch (error) {
      console.error('Error updating transaction status:', error);
      throw error;
    }
  }

  async findTransactionsByDateRange(startDate: Date, endDate: Date) {
    try {
      if (startDate > endDate) {
        throw new Error('Start date must be before end date');
      }

      const response = await lastValueFrom(
        this.transactionClient.send('findTransactionsByDateRange', { startDate, endDate })
          .pipe(
            timeout(5000),
            catchError(err => {
              if (err instanceof TimeoutError) {
                throw new Error('Transaction date range query timeout');
              }
              throw err;
            })
          )
      );
      return response;
    } catch (error) {
      console.error('Error querying transactions by date range:', error);
      throw error;
    }
  }
}
