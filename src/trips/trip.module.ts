import { Module } from '@nestjs/common';
import { TripResolver } from './trip.resolver';
import { TripService } from './trip.service';
import { UserService } from 'src/users/user.service';
import { ExpenseService } from 'src/expenses/expense.service';

@Module({
  providers: [TripResolver, TripService, UserService, ExpenseService],
})
export class TripModule {}
