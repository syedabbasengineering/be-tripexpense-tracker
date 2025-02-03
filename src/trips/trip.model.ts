import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'trips' })
export class Trip {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => [ID])
  expenses: string[];

  @Field(() => ID)
  createdBy: string;

  @Field()
  createdDate: Date;
}
