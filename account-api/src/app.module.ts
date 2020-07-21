import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { AppController } from './app.controller';
import { TransactionService } from './transaction/transaction.service';

@Module({
  controllers: [AppController],
  imports: [TransactionModule],
  providers: [TransactionService]
})
export class AppModule {}
