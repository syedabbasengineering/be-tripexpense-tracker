import { Injectable } from '@nestjs/common';
import { Expense } from './expense.model';
import { randomUUID } from 'crypto';
import { NewExpenseDTO } from './dto/new-expense.dto';

interface DataObject {
  id: string;
  type: string;
  total: number;
  createdBy: string;
  createdDate: Date;
}

function processData(data: unknown): DataObject {
  const typedData = data as DataObject;
  return {
    id: typedData.id,
    type: typedData.type,
    total: typedData.total,
    createdBy: typedData.createdBy,
    createdDate: typedData.createdDate,
  };
}

@Injectable()
export class ExpenseService {
  private expenses: Expense[];

  constructor() {
    this.expenses = [];
  }

  findOneById(id: string): Expense | undefined {
    const expense = this.expenses.find((u) => u.id === id);
    return expense;
  }

  findAll(createdBy: string): Expense[] {
    const expenses = this.expenses.filter((u) => u.createdBy === createdBy);
    if (!expenses) {
      return [];
    }
    return expenses.map((expense) => processData(expense));
  }

  findManyByIds(expenseIds: string[]): Expense[] {
    return this.expenses.filter((expense) => expenseIds.includes(expense.id));
  }

  findManyByType(type: string, userId: string): Expense[] {
    const expenses = this.expenses.filter(
      (expense) => expense.type === type && expense.createdBy === userId,
    );
    return expenses.map((expense) => ({
      id: expense.id,
      type: expense.type,
      total: expense.total,
      createdBy: expense.createdBy,
      createdDate: expense.createdDate,
    }));
  }

  addNewExpense(expense: NewExpenseDTO, userId: string): Expense {
    const newExpense: Expense = {
      ...expense,
      createdBy: userId,
      createdDate: new Date(),
      id: randomUUID(),
    };
    this.expenses.push(newExpense);
    return newExpense;
  }
}
