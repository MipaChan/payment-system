export class CreatePaymentDto {
  userId: string;
  amount: number;
  currency: string;
  description?: string;
}
