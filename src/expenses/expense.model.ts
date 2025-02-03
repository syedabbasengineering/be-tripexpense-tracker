import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'expenses' })
export class Expense {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  total: number;

  @Field(() => ID)
  createdBy: string;

  @Field()
  createdDate: Date;
}
