import { Module } from '@nestjs/common';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseService } from './expense.service';
import { UserService } from 'src/users/user.service';

@Module({
  providers: [ExpenseResolver, ExpenseService, UserService],
})
export class ExpenseModule {}
