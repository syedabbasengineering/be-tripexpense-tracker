import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Expense } from './expense.model';
import { NotFoundException } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { NewExpenseDTO } from './dto/new-expense.dto';
import { UserService } from 'src/users/user.service';

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly userService: UserService,
  ) {}

  @Query(() => Expense)
  getExpenseById(@Args('id', { type: () => String }) id: string) {
    const expense = this.expenseService.findOneById(id);
    if (!expense) {
      throw new NotFoundException(id);
    }

    return expense;
  }

  @Query(() => [Expense])
  findManyByType(
    @Args('type', { type: () => String }) type: string,
    @Args('userId') userId: string,
  ) {
    const expenses = this.expenseService.findManyByType(type, userId);
    if (!expenses) {
      throw new NotFoundException(type);
    }

    return expenses;
  }

  @Query(() => [Expense])
  getExpenses(@Args('createdBy') createdBy: string): Expense[] {
    const expenses = this.expenseService.findAll(createdBy);
    return expenses;
  }

  @Mutation(() => Expense)
  createExpense(
    @Args('expenseData') expenseData: NewExpenseDTO,
    @Args('userId') userId: string,
  ): Expense {
    return this.expenseService.addNewExpense(expenseData, userId);
  }
}
