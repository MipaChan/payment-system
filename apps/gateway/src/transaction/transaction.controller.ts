import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'apps/auth-service/src/guards/jwt-auth.guard';
import { CurrentUser } from 'apps/auth-service/src/current-user.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user: any,
  ) {
    try {
      // Add user ID to the transaction
      const transactionWithUser = {
        ...createTransactionDto,
        userId: user.id,
      };

      const result = await this.transactionService.createTransaction(transactionWithUser);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Error in createTransaction:', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message || 'Failed to create transaction',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAllTransactions() {
    return this.transactionService.findAllTransactions();
  }

  @Get('user')
  async findMyTransactions(@CurrentUser() user: any) {
    return this.transactionService.findTransactionsByUserId(user.id);
  }

  @Get('payment/:paymentId')
  async findByPaymentId(@Param('paymentId') paymentId: string) {
    return this.transactionService.findTransactionByPaymentId(paymentId);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @CurrentUser() user: any,
  ) {
    try {
      if (!id || !status) {
        throw new HttpException(
          'Transaction ID and status are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.transactionService.updateTransactionStatus(id, status);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Error in updateStatus:', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message || 'Failed to update transaction status',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('report')
  async getTransactionReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.transactionService.findTransactionsByDateRange(
      new Date(startDate),
      new Date(endDate),
    );
  }
}
