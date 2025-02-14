import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class RegisterResponse {
  @Field(() => User) // ✅ Explicitly specify User type
  user: User;

  @Field() // ✅ Token as a string
  token: string;
}