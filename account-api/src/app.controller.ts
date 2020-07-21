import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionService } from './transaction/transaction.service';

@Controller('/')
export class AppController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async get() {
    return this.transactionService.getBalanceStatus();
  }
}
