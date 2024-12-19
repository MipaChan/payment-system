import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionServiceService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    try {
      // Validate amount is positive
      if (createTransactionDto.amount <= 0) {
        throw new Error('Transaction amount must be greater than 0');
      }

      // Validate currency is supported
      const supportedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
      if (!supportedCurrencies.includes(createTransactionDto.currency.toUpperCase())) {
        throw new Error('Unsupported currency');
      }

      const createdTransaction = new this.transactionModel({
        ...createTransactionDto,
        currency: createTransactionDto.currency.toUpperCase(),
        status: 'PENDING'
      });

      const savedTransaction = await createdTransaction.save();
      return savedTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ userId }).exec();
  }

  async findByPaymentId(paymentId: string): Promise<Transaction> {
    return this.transactionModel.findOne({ paymentId }).exec();
  }

  async updateStatus(id: string, status: string): Promise<Transaction> {
    try {
      const validStatuses = ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'];
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid transaction status');
      }

      const transaction = await this.transactionModel.findById(id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      // Validate state transitions
      if (transaction.status === 'COMPLETED' && status !== 'REFUNDED') {
        throw new Error('Completed transactions can only be refunded');
      }

      if (transaction.status === 'REFUNDED') {
        throw new Error('Refunded transactions cannot be updated');
      }

      transaction.status = status;
      return await transaction.save();
    } catch (error) {
      console.error('Error updating transaction status:', error);
      throw error;
    }
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    return this.transactionModel
      .find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .exec();
  }
}
