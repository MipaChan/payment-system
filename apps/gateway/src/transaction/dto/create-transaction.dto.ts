import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Payment ID associated with this transaction' })
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @ApiProperty({ description: 'Transaction amount', example: 100.50 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Currency code', example: 'USD' })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({ description: 'Transaction type', example: 'PAYMENT' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiPropertyOptional({ description: 'Additional description for the transaction' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Additional metadata for the transaction' })
  @IsOptional()
  metadata?: Record<string, any>;
}

// userId will be added from the current user context in the controller
