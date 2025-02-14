import { Module } from '@nestjs/common';
import { TripResolver } from './trip.resolver';
import { TripService } from './trip.service';
import { UserModule } from '../users/user.module';
import { ExpenseModule } from '../expenses/expense.module';

@Module({
  imports: [UserModule, ExpenseModule], 
  providers: [TripResolver, TripService], 
})
export class TripModule {}