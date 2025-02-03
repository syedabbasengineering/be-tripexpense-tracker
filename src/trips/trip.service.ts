import { Injectable } from '@nestjs/common';
import { Trip } from './trip.model';
import { randomUUID } from 'crypto';

@Injectable()
export class TripService {
  private trips: Trip[] = [];

  findAllByUserId(userId: string): Trip[] {
    return this.trips.filter((trip) => trip.createdBy === userId);
  }

  createTrip(title: string, userId: string): Trip {
    const newTrip: Trip = {
      id: randomUUID(),
      title,
      expenses: [],
      createdBy: userId,
      createdDate: new Date(),
    };
    this.trips.push(newTrip);
    return newTrip;
  }

  addExpenseToTrip(tripId: string, expenseId: string, userId: string): Trip {
    const trip = this.trips.find(
      (t) => t.id === tripId && t.createdBy === userId,
    );
    if (!trip) {
      throw new Error('Trip not found or unauthorized');
    }
    trip.expenses.push(expenseId);
    return trip;
  }
}
