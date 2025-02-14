import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewUserDTO {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}