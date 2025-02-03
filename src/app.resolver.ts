import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String) // Define a GraphQL query
  hello(): string {
    return 'Hello, GraphQL!';
  }
}
