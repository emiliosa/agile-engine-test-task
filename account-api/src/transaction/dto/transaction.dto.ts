import {
  IsNotEmpty,
  IsNumber,
  IsEnum
} from 'class-validator';

enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit"
};

export class TransactionDTO {
  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  readonly amount: number;
}