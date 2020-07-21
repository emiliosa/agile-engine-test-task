import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  async findById(@Param() params: { id: string }) {
    return this.transactionService.findById(params.id);
  }

  @Post()
  async create(@Body() trx: TransactionDTO) {
    return this.transactionService.create(trx);
  }
}
