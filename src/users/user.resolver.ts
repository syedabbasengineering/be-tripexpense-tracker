import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { NewUserDTO } from './dto/new-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  getUserById(@Args('id', { type: () => String }) id: string) {
    const user = this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }

  @Query(() => [User])
  findManyByFirstname(
    @Args('firstname', { type: () => String }) firstname: string,
  ) {
    const users = this.userService.findManyByFirstname(firstname);
    if (!users) {
      throw new NotFoundException(firstname);
    }

    return users;
  }

  @Mutation(() => User)
  addNewUser(@Args('newUserDTO') newUserDTO: NewUserDTO): User {
    const newUser = this.userService.addNewUser(newUserDTO);

    return newUser;
  }
}
