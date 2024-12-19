import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'apps/auth-service/src/guards/jwt-auth.guard';
import { CurrentUser } from 'apps/auth-service/src/current-user.decorator';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body() createTransactionDto: any,
    @CurrentUser() user: any,
  ) {
    createTransactionDto.userId = user.id;
    return this.transactionService.createTransaction(createTransactionDto);
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
  ) {
    return this.transactionService.updateTransactionStatus(id, status);
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
