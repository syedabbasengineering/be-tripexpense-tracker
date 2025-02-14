import { Module } from '@nestjs/common';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseService } from './expense.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule],
  providers: [ExpenseResolver, ExpenseService],
})
export class ExpenseModule {}