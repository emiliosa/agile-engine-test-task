import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  isEnum
} from 'class-validator';

enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit"
};

export class TransactionDTO {
  @IsNotEmpty()
  @IsEnum(TransactionType)
  readonly type: TransactionType;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  readonly amount: number;
}