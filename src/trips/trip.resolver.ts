import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Trip } from './trip.model';
import { TripService } from './trip.service';

@Resolver(() => Trip)
export class TripResolver {
  constructor(private readonly tripService: TripService) {}

  @Query(() => [Trip])
  getTrips(@Args('userId') userId: string): Trip[] {
    return this.tripService.findAllByUserId(userId);
  }

  @Mutation(() => Trip)
  createTrip(
    @Args('title') title: string,
    @Args('userId') userId: string,
  ): Trip {
    return this.tripService.createTrip(title, userId);
  }

  @Mutation(() => Trip)
  addExpenseToTrip(
    @Args('tripId') tripId: string,
    @Args('expenseId') expenseId: string,
    @Args('userId') userId: string,
  ): Trip {
    return this.tripService.addExpenseToTrip(tripId, expenseId, userId);
  }
}
