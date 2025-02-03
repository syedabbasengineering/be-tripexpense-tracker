import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewExpenseDTO {
  @Field({ nullable: false })
  type: string;

  @Field({ nullable: false })
  total: number;
}
