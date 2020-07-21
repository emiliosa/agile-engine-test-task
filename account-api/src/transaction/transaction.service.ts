import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Transaction } from './transaction.interface';
import { TransactionDTO } from './dto/transaction.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionService {
  private transactions: Transaction[] = [];
  private balance: number = 0;

  getBalanceStatus(): number {
    return this.balance;
  }

  findAll(): Transaction[] {
    return this.transactions;
  }

  create(trx: TransactionDTO): Transaction {
    if (trx.type === 'debit' && this.balance - trx.amount < 0) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Account cannot be less than zero',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (trx.type === 'credit') {
      this.balance += trx.amount;
    } else {
      this.balance -= trx.amount;
    }
    
    const newTrx = {
      id: uuidv4(),
      ...trx,
      effectiveDate: new Date(),
    };
    this.transactions.push(newTrx);
    return newTrx;
  }

  findById(id: string): Transaction {
    return this.transactions.find(trx => trx.id === id);
  }
}
